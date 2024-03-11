package com.project.collab_tool.repository;


import com.project.collab_tool.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {


    @Query("SELECT c FROM ChatMessage c WHERE c.sender.id = :userId OR c.receiver.id = :userId")
    List<ChatMessage> findByUserId(long userId);


}
