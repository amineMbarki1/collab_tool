package com.project.collab_tool.controller;


import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.mappers.ChatMapper;
import com.project.collab_tool.service.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private ChatService chatService;
    private ChatMapper chatMapper;


    @PostMapping
    public ResponseEntity<ChatMessageResponse> createMessage(@RequestBody ChatMessageRequest chatMessageRequest) {
        var chatMessage = chatService.createChatMessage(chatMessageRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(chatMessage);
    }


}
