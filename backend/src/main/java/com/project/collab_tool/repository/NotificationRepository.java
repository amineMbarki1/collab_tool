package com.project.collab_tool.repository;

import com.project.collab_tool.model.Notification;
import com.project.collab_tool.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface NotificationRepository extends JpaRepository<Notification, Long> {


    public List<Notification> findAllByUser(UserInfo userInfo);
    /*
    @Query("SELECT n FROM Notification n")
    public List<Notification> findAllSubClasses();*/
}
