package com.project.collab_tool.mappers;

import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.model.UserInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {
    public UserResponse mapToUserResponse(UserInfo userInfo) {
        UserResponse userResponse = new UserResponse();
        BeanUtils.copyProperties(userInfo, userResponse);
        return userResponse;
    }
}
