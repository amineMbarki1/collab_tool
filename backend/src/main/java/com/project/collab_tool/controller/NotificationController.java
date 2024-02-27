package com.project.collab_tool.controller;


import com.project.collab_tool.service.NotificationEvent;
import com.project.collab_tool.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.concurrent.CopyOnWriteArrayList;


@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final CopyOnWriteArrayList<SseClient> clients = new CopyOnWriteArrayList<>();


    //id is userId
    @GetMapping("/{id}")
    public SseEmitter streamSseMvc(@PathVariable long id) throws IOException {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        var client = new SseClient(emitter, id);
        clients.add(client);
        notificationService.addEmitter(id, emitter);
        emitter.send("welcome");
        emitter.onCompletion(() -> {
            System.out.println("dekete emitter");
        });
        emitter.onTimeout(() -> {
            System.out.printf("ferf");
        });
        return emitter;
    }

    @EventListener
    @Async
    public void handleNotificationEvent(NotificationEvent notificationEvent) {
        for (SseClient client : clients) {
            try {
                if (client.getId() == notificationEvent.getUserId())
                    client.getEmitter()
                            .send(SseEmitter.event().name("notification").data(notificationEvent.getNotification()));
            } catch (IOException e) {
                e.printStackTrace();
                clients.remove(client);
            }
        }
        System.out.printf("qsdfsd");
    }
}


@Getter
@Setter
@AllArgsConstructor
class SseClient {
    private SseEmitter emitter;
    private long id;
}