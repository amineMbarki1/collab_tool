package com.project.collab_tool.dto;


import lombok.*;
import org.aspectj.weaver.ast.Not;

import java.time.Instant;

@NoArgsConstructor
@Getter
@Setter
public class NotificationResponse {
    private Instant time;
    private Instant createdOn;
    private Instant lastUpdatedOn;



}

