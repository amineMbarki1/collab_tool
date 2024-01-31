package com.project.collab_tool.service;

import com.project.collab_tool.dto.PostRequest;
import com.project.collab_tool.dto.PostResponse;
import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.Topic;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.PostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PostService {

    private final TopicService topicService;
    private final UserService userService;
    private final PostRepository postRepository;


    public PostResponse createPost(PostRequest postRequest) {
        Topic topic = topicService.getTopicEntityById(postRequest.getTopicId());
        UserInfo user = userService.getUserEntity(postRequest.getUserId());
        Post post = Post.builder()
                .topic(topic)
                .files(postRequest.getFiles())
                .createdBy(user)
                .content(postRequest.getContent())
                .build();

        postRepository.save(post);

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
                .user(
                        userService.mapToUserResponse(post.getCreatedBy()
                        )

                ).build();

    }
}