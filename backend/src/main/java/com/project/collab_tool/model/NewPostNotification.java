package com.project.collab_tool.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.*;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class NewPostNotification extends Notification {
    @ManyToOne
    private Post post;
}

