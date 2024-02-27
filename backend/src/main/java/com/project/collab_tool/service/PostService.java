package com.project.collab_tool.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.collab_tool.dto.PostRequest;
import com.project.collab_tool.dto.PostResponse;
import com.project.collab_tool.mappers.UserMapper;
import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.Topic;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEvent;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final TopicService topicService;
    private final UserService userService;
    private final PostRepository postRepository;
    private final NotificationService notificationService;
    private final UserMapper userMapper;



    public PostResponse createPost(PostRequest postRequest) throws JsonProcessingException {
        Topic topic = topicService.getTopicEntityById(postRequest.getTopicId());
        UserInfo user = userService.getUserEntity(postRequest.getUserId());
        Post post = Post.builder()
                .topic(topic)
                .files(postRequest.getFiles())
                .createdBy(user)
                .content(postRequest.getContent())
                .build();

        postRepository.save(post);

        notificationService.notifyUsers(topic.getMembers()
                .stream()
                .map(member -> member.getId())
                .toList(), post);

        return mapToPostResponse(post);

    }

    public List<PostResponse> getAllPostsByTopicId(Long topicId) {
        var topic = topicService.getTopicEntityById(topicId);
        return postRepository.findAllByTopic(topic).stream().map(this::mapToPostResponse).toList();
    }

    private PostResponse mapToPostResponse(Post post) {
        return PostResponse.builder()
                .lastUpdatedOn(post.getLastUpdatedOn())
                .createdOn(post.getCreatedOn())
                .content(post.getContent())
                .topicId(post.getTopic().getId())
                .id(post.getId())
                .user(
                        userMapper.mapToUserResponse(post.getCreatedBy()
                        )

                ).build();

    }
}