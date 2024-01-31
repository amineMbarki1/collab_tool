package com.project.collab_tool.repository;

import com.project.collab_tool.dto.UsersSearchRequest;
import com.project.collab_tool.model.UserInfo;

import java.util.List;

public interface CustomUserRepository {
    List<UserInfo> searchByPrefixed(UsersSearchRequest request);
}
