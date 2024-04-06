package com.project.collab_tool.dto;


import com.project.collab_tool.model.TopicInviteNotification;
import lombok.*;



@NoArgsConstructor
@Getter
@Setter
public class TopicInviteNotificationResponse extends NotificationResponse {
    private String topicName;
    private long topicId;
    private String topicOwnerName;

    public TopicInviteNotificationResponse(TopicInviteNotification notification) {
        this.topicName = notification.getTopic().getName();
        this.topicId = notification.getTopic().getId();
        this.topicOwnerName = notification.getTopic().getCreatedBy().getFullName();
        this.setCreatedOn(notification.getCreatedOn());
        this.setTime(notification.getTime());
        this.setLastUpdatedOn(notification.getLastUpdatedOn());
    }
}
