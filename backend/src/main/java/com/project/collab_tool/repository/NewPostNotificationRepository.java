package com.project.collab_tool.repository;


import com.project.collab_tool.model.NewPostNotification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewPostNotificationRepository extends JpaRepository<NewPostNotification, Long> {
}
