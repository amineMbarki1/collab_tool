package com.project.collab_tool.dto;


import lombok.*;

import java.time.Instant;


@NoArgsConstructor
@Getter
@Setter
public class TopicInviteNotificationResponse extends NotificationResponse {
    private String topicName;
    private long topicId;
    private String topicOwnerName;
}
