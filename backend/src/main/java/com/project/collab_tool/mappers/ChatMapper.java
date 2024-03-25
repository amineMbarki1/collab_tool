package com.project.collab_tool.mappers;


import com.project.collab_tool.dto.ChatMessageDirection;
import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.dto.ChatMessageResponse;
import com.project.collab_tool.model.ChatMessage;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class ChatMapper {
    private final UserMapper userMapper;

    public ChatMapper(UserMapper userMapper) {
        this.userMapper = userMapper;
    }

    public ChatMessageResponse toChatResponse(ChatMessage message, long authenticatedUserId) {
        var chatMessageResponse = new ChatMessageResponse();
        BeanUtils.copyProperties(message, chatMessageResponse);
        chatMessageResponse.setDirection(
                authenticatedUserId == message.getSender().getId() ?
                        ChatMessageDirection.SENT : ChatMessageDirection.RECEIVED
        );
        return chatMessageResponse;
    }

    public ChatMessage toChatMessage(ChatMessageRequest message) {
        var chatMessage = new ChatMessage();
        BeanUtils.copyProperties(message, chatMessage);
        return chatMessage;
    }
}
