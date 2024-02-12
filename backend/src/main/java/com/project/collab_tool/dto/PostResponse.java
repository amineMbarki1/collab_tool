package com.project.collab_tool.dto;


import com.project.collab_tool.model.FileInfo;
import lombok.*;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
    private List<FileInfo> files = new ArrayList<>();

}
