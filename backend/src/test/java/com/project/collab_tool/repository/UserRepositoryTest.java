package com.project.collab_tool.repository;


import com.project.collab_tool.dto.UsersSearchRequest;
import com.project.collab_tool.model.UserInfo;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.EmbeddedDatabaseConnection;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(connection = EmbeddedDatabaseConnection.H2)
public class UserRepositoryTest {

    @Autowired
    private UserRepository userRepository;


    // Use naming convention for tests
    // ClassName_MethodName_ExpectedBehavior : pokemonRepository_saveAll_ReturnsSavedPokemon() {}

    @Test
    public void UserRepository_FindByEmailPrefix_ReturnsUsersWithEmailStartingWithPrefix() {
        //Arrange
        UserInfo userInfo = UserInfo.builder().lastName("alibi").firstName("salim").email("salim@gmail.com").password("hello").build();
        UserInfo userInfo0 = UserInfo.builder().lastName("mbarki").firstName("amine").email("salim@gmail.com").password("hello").build();

        UserInfo userInfo1 = UserInfo.builder().lastName("mbarki").firstName("amine").email("mohammed@gmail.com").password("hello").build();
        UserInfo userInfo2 = UserInfo.builder().lastName("mbarki").firstName("amine").email("amine@gmail.com").password("hello").build();
        userRepository.saveAll(List.of(userInfo1, userInfo2, userInfo0, userInfo));

        var bySa = userRepository.findByEmailStartingWith("sa");
        var bym = userRepository.findByEmailStartingWith("m");

        Assertions.assertEquals(2, bySa.size());
        Assertions.assertEquals(1, bym.size());

    }

    @Test
    public void UserRepository_FindByEmailOrFullNamePrefix_ReturnsUsersWithFullNameOrEmailStartingWithPrefix() {
        //Arrange
        UserInfo userInfo = UserInfo.builder().lastName("alibi").firstName("salim").email("salim@gmail.com").password("hello").build();
        UserInfo userInfo0 = UserInfo.builder().lastName("mbarki").firstName("amine").email("salim@gmail.com").password("hello").build();

        UserInfo userInfo1 = UserInfo.builder().lastName("mbarki").firstName("amine").email("mohammed@gmail.com").password("hello").build();
        UserInfo userInfo2 = UserInfo.builder().lastName("mbarki").firstName("amine").email("amine@gmail.com").password("hello").build();
        userRepository.saveAll(List.of(userInfo1, userInfo2, userInfo0, userInfo));

        //Act
        List<UserInfo> res = userRepository.findByFullNameOrEmailPrefix("amine mbarki");
        //Assert
        Assertions.assertEquals(3, res.size());


    }

    @Test
    public void UserRepository_FindByFullNamePrefix_ReturnsUsersWithFullNameStartingWithPrefix() {
        //Arrange
        UserInfo userInfo = UserInfo.builder().lastName("alibi").firstName("salim").email("salim@gmail.com").password("hello").build();
        UserInfo userInfo0 = UserInfo.builder().lastName("mbarki").firstName("amine").email("salim@gmail.com").password("hello").build();

        UserInfo userInfo1 = UserInfo.builder().lastName("jabli").firstName("karim").email("mohammed@gmail.com").password("hello").build();
        UserInfo userInfo2 = UserInfo.builder().lastName("jaffel").firstName("amine").email("amine@gmail.com").password("hello").build();

        userRepository.saveAll(List.of(userInfo1, userInfo2, userInfo0, userInfo));

        //Act
        List<UserInfo> res = userRepository.findByFullNameOrEmailPrefix("amine");
        //Assert
        Assertions.assertEquals(2, res.size());


    }

    @Test
    public void UserRepository_SearchUsers_ReturnsUsersMatchingSearchRequest() {
        //Arrange
        UserInfo userInfo = UserInfo.builder().lastName("alibi").firstName("salim").email("salim@gmail.com").password("hello").build();
        UserInfo userInfo0 = UserInfo.builder().lastName("mbarki").firstName("amine").email("salim@gmail.com").password("hello").build();
        UserInfo userInfo1 = UserInfo.builder().lastName("jabli").firstName("karim").email("mohammed@gmail.com").password("hello").build();
        UserInfo userInfo2 = UserInfo.builder().lastName("jaffel").firstName("amine").email("amine@gmail.com").password("hello").build();
        UserInfo userInfo3 = UserInfo.builder().lastName("salem").firstName("amina").email("amina@gmail.com").password("hello").build();

        var searchRequest = UsersSearchRequest.builder().emailOrFullName("salim").build();
        var emailSearchRequest = UsersSearchRequest.builder().email("amin").build();
        userRepository.saveAll(List.of(userInfo3, userInfo2, userInfo1, userInfo0, userInfo));

        //Act
        //var res = userRepository.searchUsers(emailSearchRequest);


        //Assert
       // Assertions.assertEquals(2, res.size());
       // Assertions.assertEquals(2, res.size());


    }


}
