package com.project.collab_tool.service;


import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.dto.RecentMessage;
import com.project.collab_tool.mappers.ChatMapper;
import com.project.collab_tool.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatMapper chatMapper;

    private final UserService userService;

    public ChatService(ChatMessageRepository chatMessageRepository, ChatMapper chatMapper, UserService userService) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatMapper = chatMapper;
        this.userService = userService;
    }

    public ChatMessageResponse createChatMessage(ChatMessageRequest messageRequest) {
        var sender = userService.getUserEntity(messageRequest.getSenderId());
        var receiver = userService.getUserEntity(messageRequest.getReceiverId());

        var chatMessage = chatMapper.toChatMessage(messageRequest);
        chatMessage.setReceiver(receiver);
        chatMessage.setSender(sender);
        chatMessageRepository.save(chatMessage);
        return null;
        //return chatMapper.toChatResponse(chatMessage);
    }


    public List<ChatMessageResponse> getMessages(long userId) {
        var messages = chatMessageRepository.findByUserId(userId);
        return null;
        // return messages.stream().map(chatMapper::toChatResponse).toList();
    }

    public List<ChatMessageResponse> getMessages(long userId, long chatPartnerId) {
        return chatMessageRepository
                .findConversationBetween(List.of(userId, chatPartnerId))
                .stream()
                .map(message -> chatMapper.toChatResponse(message, userId))
                .toList();
    }

    public List<RecentMessage> getRecentMessages(long userId) {
        return chatMessageRepository.findRecentMessagesFor(userId);
    }
}
