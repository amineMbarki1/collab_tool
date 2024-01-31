package com.project.collab_tool.dto;


import lombok.*;

import java.time.Instant;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class PostResponse {

    private UserResponse user;
    private String content;
    private Instant createdOn;
    private Instant lastUpdatedOn;
    private Long topicId;

}
