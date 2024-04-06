package com.project.collab_tool.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RedisChatResponse {
    private String body;
    private UserResponse from;
}
