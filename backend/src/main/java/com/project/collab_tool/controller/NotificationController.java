package com.project.collab_tool.controller;


import com.project.collab_tool.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    //id is userId
    @GetMapping("/{id}")
    public SseEmitter streamSseMvc(@PathVariable long id) throws IOException {
        SseEmitter emitter = new SseEmitter();
        notificationService.addEmitter(id, emitter);
        emitter.onCompletion(() -> {
            notificationService.removeEmitter(id);
        });
        return emitter;
    }


}
