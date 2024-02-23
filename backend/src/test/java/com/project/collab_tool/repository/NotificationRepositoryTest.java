package com.project.collab_tool.repository;


import com.project.collab_tool.model.NewPostNotification;
import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.TopicInviteNotification;
import com.project.collab_tool.model.UserInfo;
import org.aspectj.weaver.ast.Not;
import org.checkerframework.checker.units.qual.A;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class NotificationRepositoryTest {

    @Autowired
    private NotificationRepository notificationRepository;



    @Test
    public void NotificationRepository_SavesSubClasses() {
        var newPostNotification = new NewPostNotification();
        newPostNotification.setBody("hello this new post");


        var newInviteNotification = new TopicInviteNotification();

        newInviteNotification.setBody("hello this is a topic invite");
        notificationRepository.saveAll(List.of(newPostNotification, newInviteNotification));

        Assertions.assertEquals(notificationRepository.findAll().size(), 2);



    }

}
