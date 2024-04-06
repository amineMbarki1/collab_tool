package com.project.collab_tool.controller;


import com.project.collab_tool.dto.NotificationResponse;
import com.project.collab_tool.mappers.NotificationMapper;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.service.NotificationEvent;
import com.project.collab_tool.service.NotificationService;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.context.event.EventListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPubSub;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;


@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;
    private final CopyOnWriteArrayList<SseClient> clients = new CopyOnWriteArrayList<>();
    private final NotificationMapper notificationMapper = new NotificationMapper();
    private final JedisPool jedisPool;


    //id is userId
    @GetMapping("/{id}")
    public SseEmitter streamSseMvc(@PathVariable long id) throws IOException {

        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        new Thread(() -> {

            handleMessageEvent(emitter, id);
        }).start();

        System.out.println("client connected");

        var client = new SseClient(emitter, id);
        clients.add(client);
        notificationService.addEmitter(id, emitter);
        emitter.send("welcome");
        emitter.onCompletion(() -> {
            System.out.println("delete emitter");
        });
        emitter.onTimeout(() -> {
            System.out.printf("ferf");
        });
        return emitter;
    }

    @GetMapping
    public List<NotificationResponse> getNotificatiosn(JwtAuthenticationToken authenticationToken) {
        UserInfo user = (UserInfo) authenticationToken.getDetails();
        var notifications = notificationService.getNotifications(user);
        return notifications.stream().map(notificationMapper::mapToNotificationResponse).toList();
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
    }

    
    public void handleMessageEvent(SseEmitter emitter, long id) {
        try (var jedis = jedisPool.getResource()) {
            jedis.subscribe(new JedisPubSub() {

                @Override
                public void onMessage(String channel, String message) {
                    System.out.printf("%s received a message %s%n", channel, message);
                    try {
                        emitter.send(SseEmitter.event().name("NEW_MESSAGE").data(message));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                }
            }, String.valueOf(id));
        }
    }
}


@Getter
@Setter
@AllArgsConstructor
class SseClient {
    private SseEmitter emitter;
    private long id;
}