package com.project.collab_tool.repository;

import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.Topic;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    List<Post> findAllByTopic(Topic topic);
}
