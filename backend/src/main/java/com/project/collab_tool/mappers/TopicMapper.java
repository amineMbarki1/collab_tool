package com.project.collab_tool.mappers;


import com.project.collab_tool.dto.TopicResponse;
import com.project.collab_tool.model.Topic;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class TopicMapper {
    public TopicResponse mapToTopicResponse(Topic topic) {
        TopicResponse topicResponse = new TopicResponse();
        BeanUtils.copyProperties(topic, topicResponse);
        return topicResponse;
    }
}
