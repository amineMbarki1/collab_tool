package com.project.collab_tool.service;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.dto.RecentMessage;
import com.project.collab_tool.mappers.ChatMapper;
import com.project.collab_tool.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;
import redis.clients.jedis.JedisPool;

import java.util.List;
import java.util.concurrent.CompletableFuture;

@Service
public class ChatService {

    private final ChatMessageRepository chatMessageRepository;
    private final ChatMapper chatMapper;
    private final UserService userService;
    private final JedisPool jedisPool;
    private final ObjectMapper objectMapper;

    public ChatService(ChatMessageRepository chatMessageRepository, ChatMapper chatMapper, UserService userService, JedisPool jedisPool, ObjectMapper objectMapper) {
        this.chatMessageRepository = chatMessageRepository;
        this.chatMapper = chatMapper;
        this.userService = userService;
        this.jedisPool = jedisPool;
        this.objectMapper = objectMapper;
    }

    public ChatMessageResponse createChatMessage(ChatMessageRequest messageRequest) {
        var sender = userService.getUserEntity(messageRequest.getSenderId());
        var receiver = userService.getUserEntity(messageRequest.getReceiverId());

        var chatMessage = chatMapper.toChatMessage(messageRequest);
        chatMessage.setReceiver(receiver);
        chatMessage.setSender(sender);
        chatMessageRepository.save(chatMessage);

        new Thread(() -> {
            try (var jedis = jedisPool.getResource()) {
                jedis.publish(
                        String.valueOf(receiver.getId()),
                        stringify(chatMapper.toRedisChatResponse(chatMessage)
                        ));
            }
        }).start();

        return null;
    }


    public List<ChatMessageResponse> getMessages(long userId) {
        var messages = chatMessageRepository.findByUserId(userId);
        return null;
        // return messages.stream().map(chatMapper::toChatResponse).toList();
    }

    public List<ChatMessageResponse> getMessages(long userId, long chatPartnerId) {
        return chatMessageRepository.findConversationBetween(List.of(userId, chatPartnerId)).stream().map(message -> chatMapper.toChatResponse(message, userId)).toList();
    }

    public List<RecentMessage> getRecentMessages(long userId) {
        return chatMessageRepository.findRecentMessagesFor(userId);
    }

    private String stringify(Object object) {
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

    }
}
