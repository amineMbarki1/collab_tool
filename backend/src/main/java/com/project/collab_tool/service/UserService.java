package com.project.collab_tool.service;


import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.dto.UsersSearchRequest;
import com.project.collab_tool.mappers.UserMapper;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public void addMemberToTeam(Long teamLeaderId, Long memberId) {
        var teamLeader = userRepository.findById(teamLeaderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var member = userRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        teamLeader.getTeam().add(member);
        userRepository.save(teamLeader);
    }

    public void removeMember(Long teamLeaderId, Long memberId) {
        var teamLeader = userRepository.findById(teamLeaderId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        var member = userRepository.findById(memberId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        teamLeader.getTeam().removeIf(teamMember -> teamMember.getId() == member.getId());
        userRepository.save(teamLeader);
    }

    public List<UserResponse> getUsers() {
        return userRepository.findAll().stream().map(userMapper::mapToUserResponse).toList();
    }

    public List<UserResponse> getTeamMembers(Long teamLeaderId) {
        var teamLeader = findUserInfo(teamLeaderId);
        return teamLeader.getTeam().stream().map(userMapper::mapToUserResponse).toList();
    }

    public UserResponse getUser(Long id) {
        var user = findUserInfo(id);
        return userMapper.mapToUserResponse(user);
    }

    public UserInfo getUserEntity(Long id) {
        return findUserInfo(id);
    }

    public List<UserResponse> searchByPrefix(String prefix) {
        return userRepository.findByFullNameOrEmailPrefix(prefix)
                .stream()
                .map(userMapper::mapToUserResponse)
                .toList();
    }

    public List<UserResponse> searchByPrefixed(UsersSearchRequest searchRequest) {
        return userRepository.searchByPrefixed(searchRequest).stream().map(userMapper::mapToUserResponse).toList();
    }


    private UserInfo findUserInfo(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
    }


}
