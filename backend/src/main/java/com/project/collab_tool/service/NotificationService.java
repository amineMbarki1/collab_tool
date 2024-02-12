package com.project.collab_tool.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.collab_tool.dto.NewPostNotificationResponse;
import com.project.collab_tool.model.NewPostNotification;
import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.NewPostNotificationRepository;
import com.project.collab_tool.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final NewPostNotificationRepository newPostNotificationRepository;
    private final ObjectMapper objectMapper;
    private final UserService userService;


    public void addEmitter(Long userId, SseEmitter emitter) {
        emitters.put(userId, emitter);

    }

    public void removeEmitter(Long userId) {
        emitters.remove(userId);
    }




    @Async
    public void notifyUsers(List<Long> userIds, Post post) throws JsonProcessingException {

        //1-Create notifications
        for (long id : userIds) {
            UserInfo user = userService.getUserEntity(id);
            NewPostNotification notification = new NewPostNotification();
            notification.setUser(user);
            notification.setPost(post);
            notification.setTime(post.getCreatedOn());
            newPostNotificationRepository.save(notification);
        }

        //2-Emit notifications
        var notification = NewPostNotificationResponse.builder()
                .postId(post.getId())
                .topicId(post.getTopic().getId())
                .topicName(post.getTopic().getName())
                .postedBy(userService.mapToUserResponse(post.getCreatedBy()))
                .time(post.getCreatedOn())
                .build();

        var notificationJson = objectMapper.writeValueAsString(notification);

        for (long id : userIds) {
            Optional.ofNullable(emitters.get(id)).ifPresent(emitter -> {
                try {
                    emitter.send(notificationJson);
                } catch (IOException e) {
                    e.printStackTrace();
                    System.out.println("Error sending notification");
                }
            });
        }
    }



}
