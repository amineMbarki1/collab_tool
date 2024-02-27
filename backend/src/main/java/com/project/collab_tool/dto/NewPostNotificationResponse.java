package com.project.collab_tool.dto;

import com.project.collab_tool.mappers.UserMapper;
import com.project.collab_tool.model.NewPostNotification;
import lombok.*;
import org.springframework.stereotype.Service;

import java.time.Instant;


@Getter
@Setter
@NoArgsConstructor
public class NewPostNotificationResponse extends NotificationResponse {
    private long postId;
    private long topicId;
    private String topicName;
    private UserResponse postedBy;
    private Instant time;
    private UserMapper userMapper;
    


    public NewPostNotificationResponse(NewPostNotification newPostNotification) {
        this.postedBy = userMapper.mapToUserResponse( newPostNotification.getPost().getCreatedBy());
        //TODO: FINISH CONSTRUCTOR
    }
}
