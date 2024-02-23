package com.project.collab_tool.dto;

import lombok.*;
import org.springframework.stereotype.Service;

import java.time.Instant;


@Getter
@Setter
@NoArgsConstructor
public class NewPostNotificationResponse extends NotificationResponse {
    private long postId;
    private long topicId;
    private String topicName;
    private UserResponse postedBy;
    private Instant time;
}
