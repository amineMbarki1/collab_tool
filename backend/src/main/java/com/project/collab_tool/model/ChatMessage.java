package com.project.collab_tool.model;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String body;

    @ManyToOne
    private UserInfo sender;
    @ManyToOne
    private UserInfo receiver;
}
