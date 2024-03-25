package com.project.collab_tool.controller;


import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.dto.RecentMessage;
import com.project.collab_tool.mappers.ChatMapper;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.service.ChatService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private ChatService chatService;
    private ChatMapper chatMapper;

    public ChatController(ChatService chatService, ChatMapper chatMapper) {
        this.chatService = chatService;
        this.chatMapper = chatMapper;
    }

    @PostMapping
    public ResponseEntity<ChatMessageResponse> createMessage(@RequestBody ChatMessageRequest chatMessageRequest) {
        var chatMessage = chatService.createChatMessage(chatMessageRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(chatMessage);
    }

    @GetMapping("/{chatPartnerId}")
    public ResponseEntity<List<ChatMessageResponse>> getMessages(@PathVariable long chatPartnerId,
                                                                 JwtAuthenticationToken authenticationToken) {
        var userInfo = (UserInfo) authenticationToken.getDetails();
        var messages = chatService.getMessages(userInfo.getId(), chatPartnerId);
        return ResponseEntity.ok(messages);
    }


    @GetMapping("/recentMessages")
    public ResponseEntity<List<RecentMessage>> getRecentMessages(JwtAuthenticationToken authenticationToken) {
        var userInfo = (UserInfo) authenticationToken.getDetails();
        return ResponseEntity.ok(chatService.getRecentMessages(userInfo.getId()));
    }


}
