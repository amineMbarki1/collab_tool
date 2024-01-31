package com.project.collab_tool.dto;

import com.project.collab_tool.model.FileInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostRequest {
    private String content;
    private Long topicId;
    private List<FileInfo> files = new ArrayList<>();
    private Long userId;
}
