package com.project.collab_tool.mappers;

import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.model.ChatMessage;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;


@ExtendWith(SpringExtension.class)
public class ChatMapperTest {

    private ChatMapper chatMapper = new ChatMapper();

    @Test
    public void toChatMessage_returnsCorrectMessage() {
        //Arrange
        ChatMessageRequest messageRequest = new ChatMessageRequest();
        messageRequest.setBody("hell");

        //Act
        var message = chatMapper.toChatMessage(messageRequest);

        //Assert
        Assertions.assertEquals(message.getBody(), messageRequest.getBody());

    }

    @Test
    public void toChatMessageResponse_returnsCorrectMessageResponse() {
        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setBody("Hello");
        var response = chatMapper.toChatResponse(chatMessage);
        Assertions.assertEquals(response.getBody(), chatMessage.getBody());
    }


}
