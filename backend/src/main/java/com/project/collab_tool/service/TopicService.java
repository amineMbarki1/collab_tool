package com.project.collab_tool.service;


import com.project.collab_tool.dto.TopicRequest;
import com.project.collab_tool.dto.TopicResponse;
import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.model.Topic;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.TopicRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TopicService {
    private final TopicRepository topicRepository;
    private final UserService userService;


    public TopicResponse createTopic(TopicRequest topicRequest, Long topicOwnerId) {
        Topic topic = Topic.builder()
                .name(topicRequest.getName())
                .description(topicRequest.getDescription())
                .build();

        UserInfo userInfo = userService.getUserEntity(topicOwnerId);
        topic.setCreatedBy(userInfo);
        topicRepository.save(topic);
        return mapToTopicResponse(topic);
    }


    public List<TopicResponse> getAllTopics() {

        return topicRepository.findAll().stream().map(this::mapToTopicResponse).toList();

    }

    public Topic getTopicEntityById(Long id) {
        return topicRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }

    public void addMember(Long memberId, Long topicId, Long topicOwnerId) {
        Topic topic = topicRepository.findById(topicId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));

        if (topic.getMembers().stream().anyMatch(member -> member.getId() == memberId))
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST);

        if (!(topic.getCreatedBy().getId() == topicOwnerId)) throw new ResponseStatusException(HttpStatus.FORBIDDEN);
        UserInfo topicOwner = userService.getUserEntity(topicOwnerId);

        if (!(topicOwner.getTeam().stream().anyMatch(member -> member.getId() == memberId)))
            throw new ResponseStatusException(HttpStatus.FORBIDDEN);

        UserInfo user = userService.getUserEntity(memberId);
        topic.getMembers().add(user);
        topicRepository.save(topic);
    }

    public List<UserResponse> getMembers(Long id) {
        Topic topic = topicRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        List<UserResponse> users = topic.getMembers().stream().map(userService::mapToUserResponse).toList();
        return users;
    }

    private TopicResponse mapToTopicResponse(Topic topic) {
        TopicResponse topicResponse = new TopicResponse();
        BeanUtils.copyProperties(topic, topicResponse);
        return topicResponse;
    }


}
