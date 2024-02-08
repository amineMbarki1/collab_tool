package com.project.collab_tool.service;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class NotificationService {
    private Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();


    public void addEmitter(Long userId, SseEmitter emitter) {
        emitters.put(userId, emitter);

    }

    public void removeEmitter(Long userId) {
        emitters.remove(userId);
    }

    public void notifyUsers(List<Long> userIds, String notification) {
        userIds.forEach(id -> {
            Optional.ofNullable(emitters.get(id)).ifPresent(emitter -> {
                try {
                    emitter.send(notification);
                } catch (IOException e) {
                    System.out.println("Error sending notification");
                }
            });
        });
    }

}
