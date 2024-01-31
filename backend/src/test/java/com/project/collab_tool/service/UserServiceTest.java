package com.project.collab_tool.service;


import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.repository.UserRepository;
import org.apache.catalina.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Optional;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    @Test
    public void UserService_addMember_Success() {
        //Arrange
        UserInfo teamLeader = UserInfo.builder()
                .firstName("amine")
                .lastName("mbarki")
                .email("amine@gmail.com")
                .team(new HashSet<>())
                .build();
        UserInfo memberA = UserInfo.builder()
                .firstName("karim")
                .lastName("mbarki")
                .email("karim@gmail.com")
                .team(new HashSet<>())
                .build();
        when(userRepository.findById(1l)).thenReturn(Optional.of(teamLeader));
        when(userRepository.findById(2l)).thenReturn(Optional.of(memberA));

        //Act
        userService.addMemberToTeam(1l, 2l);

        Optional<UserInfo> first = teamLeader.getTeam().stream().findFirst();
        //Assert
        Assertions.assertTrue(first.isPresent());
        verify(userRepository).save(teamLeader);

        System.out.println("");

    }


}
