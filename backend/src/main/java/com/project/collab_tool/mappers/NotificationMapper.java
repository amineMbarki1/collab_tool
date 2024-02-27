package com.project.collab_tool.mappers;

import com.project.collab_tool.dto.NewPostNotificationResponse;
import com.project.collab_tool.dto.NotificationResponse;
import com.project.collab_tool.dto.TopicInviteNotificationResponse;
import com.project.collab_tool.model.NewPostNotification;
import com.project.collab_tool.model.Notification;
import com.project.collab_tool.model.TopicInviteNotification;

public class NotificationMapper {


    public NotificationResponse mapToNotificationResponse(Notification notification) {
        if (notification instanceof NewPostNotification) {
            return new NewPostNotificationResponse();
        }

        if (notification instanceof TopicInviteNotification) {
            return new TopicInviteNotificationResponse((TopicInviteNotification) notification);
        }
        return null;
    }
}
