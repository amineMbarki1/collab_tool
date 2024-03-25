package com.project.collab_tool.mappers;

import com.project.collab_tool.dto.ChatMessageDirection;
import com.project.collab_tool.dto.ChatMessageRequest;
import com.project.collab_tool.model.ChatMessage;
import com.project.collab_tool.model.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;


@ExtendWith(SpringExtension.class)
public class ChatMapperTest {

    private ChatMapper chatMapper = new ChatMapper(new UserMapper());

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

        var sender = new UserInfo();sender.setId(1L);
        var receiver = new UserInfo();receiver.setId(2L);

        chatMessage.setBody("Hello");
        chatMessage.setReceiver(receiver);chatMessage.setSender(sender);



        var responseSender = chatMapper.toChatResponse(chatMessage, 1);
       var responseReceiver = chatMapper.toChatResponse(chatMessage, 2);

       Assertions.assertEquals(ChatMessageDirection.RECEIVED, responseReceiver.getDirection());
       Assertions.assertEquals(ChatMessageDirection.SENT, responseSender.getDirection());
       Assertions.assertEquals(chatMessage.getBody(), responseSender.getBody());
    }


}
