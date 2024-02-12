package com.project.collab_tool.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.time.Instant;

@Builder
@Getter
@Setter
public class NewPostNotificationResponse {
    private long postId;
    private long topicId;
    private String topicName;
    private UserResponse postedBy;
    private Instant time;
}
