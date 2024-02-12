package com.project.collab_tool.dto;


import lombok.*;

import java.time.Instant;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class NotificationResponse {
    private String body;
    private Instant time;
    private Instant createdOn;
    private Instant lastUpdatedOn;

}

