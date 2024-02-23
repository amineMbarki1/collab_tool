package com.project.collab_tool.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter
@Setter
@NoArgsConstructor
public class TopicInviteNotification extends Notification {
    @ManyToOne
    private Topic topic;
}
