package com.project.collab_tool.service;


import com.project.collab_tool.model.Notification;
import lombok.Getter;
import org.springframework.context.ApplicationEvent;

@Getter
public class NotificationEvent extends ApplicationEvent {
     private final String notification;
     private final long userId;
    public NotificationEvent(Object source, String notification, long userId) {
        super(source);
        this.notification = notification;
        this.userId = userId;
    }
}
