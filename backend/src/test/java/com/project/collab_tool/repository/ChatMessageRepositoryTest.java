package com.project.collab_tool.repository;


import com.project.collab_tool.model.ChatMessage;
import com.project.collab_tool.model.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class ChatMessageRepositoryTest {

    @Autowired
    private ChatMessageRepository chatMessageRepository;
    @Autowired
    UserRepository userRepository;


    @Test
    public void findByUserId_returnsMessagesSentOrReceivedByUser() {
        UserInfo userInfo = UserInfo.builder().firstName("amine").lastName("mbarki").email("amine@gmail.com").build();
        userRepository.save(userInfo);
        UserInfo userInfo2 = UserInfo.builder().firstName("karim").lastName("mbarki").email("amine2@gmail.com").build();
        userRepository.save(userInfo2);
        UserInfo userInfo3 = UserInfo.builder().firstName("salim").lastName("mbarki").email("amine3@gmail.com").build();
        userRepository.save(userInfo3);

        ChatMessage chatMessage = new ChatMessage();
        chatMessage.setReceiver(userInfo);
        chatMessage.setSender(userInfo2);

        ChatMessage chatMessage1 = new ChatMessage();
        chatMessage1.setSender(userInfo2);
        chatMessage1.setReceiver(userInfo);

        ChatMessage chatMessage2 = new ChatMessage();
        chatMessage2.setReceiver(userInfo2);
        chatMessage2.setSender(userInfo3);


        chatMessageRepository.saveAll(List.of(chatMessage1, chatMessage, chatMessage2));
        var messagesUser2 = chatMessageRepository.findByUserId(userInfo2.getId());
        var messagesUser = chatMessageRepository.findByUserId(userInfo.getId());
        var messagesUser3 = chatMessageRepository.findByUserId(userInfo3.getId());

        System.out.println("hello");

        Assertions.assertAll(
                () -> Assertions.assertEquals(messagesUser.size(), 2),
                () -> Assertions.assertEquals(messagesUser2.size(), 3),
                () -> Assertions.assertEquals(messagesUser3.size(), 1)
        );

    }

}
