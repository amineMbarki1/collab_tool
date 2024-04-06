package com.project.collab_tool.repository;


import com.project.collab_tool.dto.RecentMessage;
import com.project.collab_tool.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {


    @Query("SELECT c FROM ChatMessage c WHERE c.sender.id = :userId OR c.receiver.id = :userId")
    List<ChatMessage> findByUserId(long userId);

    @Query("SELECT c FROM ChatMessage c WHERE c.sender.id IN :chatPartnersId AND c.receiver.id IN :chatPartnersId AND c.sender.id != c.receiver.id")
    List<ChatMessage> findConversationBetween(List<Long> chatPartnersId);


    @Query(value = "SELECT CONCAT(first_name, ' ' ,last_name) as partnerFullName, partner_id as partnerId, body as lastMessage "  +
            "FROM user_info " +
            "JOIN ( " +
            "SELECT body, " +
            "partner_id " +
            "FROM ( " +
            "SELECT max(id) as last_id, " +
            "CASE " +
            "WHEN sender_id = :userId THEN receiver_id " +
            "WHEN receiver_id = :userId THEN sender_id " +
            "END as partner_id " +
            "from chat_message " +
            "WHERE ( " +
            "sender_id = :userId " +
            "or receiver_id = :userId " +
            ") " +
            "GROUP BY partner_id " +
            ") " +
            "JOIN chat_message c ON last_id = c.id " +
            ") ON partner_id = user_info.id",
            nativeQuery = true)

    List<RecentMessage> findRecentMessagesFor(long userId);

}
