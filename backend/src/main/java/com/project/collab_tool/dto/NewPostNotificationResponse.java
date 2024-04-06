package com.project.collab_tool.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.project.collab_tool.mappers.UserMapper;
import com.project.collab_tool.model.NewPostNotification;
import lombok.*;
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

    @JsonIgnore
    private UserMapper userMapper = new UserMapper();
    


    public NewPostNotificationResponse(NewPostNotification newPostNotification) {
        this.postedBy = userMapper.mapToUserResponse( newPostNotification.getPost().getCreatedBy());
        this.postId = newPostNotification.getPost().getId();
        this.topicId = newPostNotification.getPost().getTopic().getId();
        this.time = newPostNotification.getTime();
        this.topicName = newPostNotification.getPost().getTopic().getName();
        this.setCreatedOn(this.getCreatedOn());
        this.setLastUpdatedOn(this.getLastUpdatedOn());
        this.setRead(newPostNotification.isRead());
    }
}
