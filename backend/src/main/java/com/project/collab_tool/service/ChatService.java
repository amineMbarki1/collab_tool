package com.project.collab_tool.service;


import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.mappers.ChatMapper;
import com.project.collab_tool.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatMapper chatMapper;

    public ChatService(ChatMessageRepository chatMessageRepository, ChatMapper chatMapper) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatMapper = chatMapper;
    }

    public ChatMessageResponse createChatMessage(ChatMessageRequest messageRequest) {
        var chatMessage = chatMessageRepository.save(chatMapper.toChatMessage(messageRequest));
        return chatMapper.toChatResponse(chatMessage);
    }


    public List<ChatMessageResponse> getMessages(long userId) {
        var messages = chatMessageRepository.findByUserId(userId);
        return messages.stream().map(chatMapper::toChatResponse).toList();
    }
}
