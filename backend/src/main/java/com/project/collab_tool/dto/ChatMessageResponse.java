package com.project.collab_tool.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatMessageResponse {
    private String body;
    private ChatMessageDirection direction;

}

