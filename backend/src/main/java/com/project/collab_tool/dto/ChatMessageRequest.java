package com.project.collab_tool.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageRequest {
    private String body;
    private String senderId;
    private String receiverId;
}
