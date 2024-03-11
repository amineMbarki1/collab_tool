package com.project.collab_tool.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.collab_tool.dto.NewPostNotificationResponse;
import com.project.collab_tool.dto.TopicInviteNotificationResponse;
import com.project.collab_tool.mappers.TopicMapper;
import com.project.collab_tool.mappers.UserMapper;
import com.project.collab_tool.model.*;
import com.project.collab_tool.repository.NewPostNotificationRepository;
import com.project.collab_tool.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import org.yaml.snakeyaml.emitter.Emitter;

import java.io.IOException;
import java.time.Instant;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.CopyOnWriteArrayList;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final Map<Long, List<SseEmitter>> userIdToemitters = new ConcurrentHashMap<>();
    private final NotificationRepository notificationRepository;
    private final NewPostNotificationRepository newPostNotificationRepository;
    private final ObjectMapper objectMapper;
    private final UserService userService;
    private final ApplicationEventPublisher eventPublisher;
    private final UserMapper userMapper;


    public void addEmitter(Long userId, SseEmitter emitter) {
        userIdToemitters.putIfAbsent(userId, new CopyOnWriteArrayList<>());
        var emitters = userIdToemitters.get(userId);

        emitters.add(emitter);
    }

    public void removeEmitter(Long userId, SseEmitter emitter) {
        userIdToemitters.get(userId).remove(emitter);
    }

    public List<Notification> getNotifications(UserInfo userInfo) {
        return notificationRepository.findAll();
    }

    @Async
    public void notifyUser(long userId, Topic topic) {
        UserInfo user = userService.getUserEntity(userId);

        var notification = new TopicInviteNotification();
        notification.setTopic(topic);
        notification.setUser(user);
        notification.setTime(Instant.now());

        notificationRepository.save(notification);


        var notificationResponse = new TopicInviteNotificationResponse();
        notificationResponse.setTopicName(topic.getName());
        notificationResponse.setTopicId(topic.getId());
        notificationResponse.setTopicOwnerName(topic.getCreatedBy().getFullName());
        notificationResponse.setTime(notification.getTime());

        String serializedNotification = null;

        try {
            serializedNotification = objectMapper.writeValueAsString(notificationResponse);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        eventPublisher.publishEvent(new NotificationEvent(this, serializedNotification, userId));

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
        var notification = new NewPostNotificationResponse();
        notification.setPostId(post.getId());
        notification.setTopicId(post.getTopic().getId());
        notification.setTopicName(post.getTopic().getName());
        notification.setPostedBy(userMapper.mapToUserResponse(post.getCreatedBy()));
        notification.setTime(post.getCreatedOn());
        var notificationJson = objectMapper.writeValueAsString(notification);

        for (long id : userIds) {
            eventPublisher.publishEvent(new NotificationEvent(this,
                    notificationJson,
                    id
            ));
        }
    }

}
