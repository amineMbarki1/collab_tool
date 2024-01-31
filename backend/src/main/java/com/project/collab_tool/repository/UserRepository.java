package com.project.collab_tool.repository;

import com.project.collab_tool.model.UserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserInfo, Long>, CustomUserRepository {
    Optional<UserInfo> findByEmail(String email);

    List<UserInfo> findByEmailStartingWith(String prefix);


    @Query("select u from UserInfo u where " +
            "concat(u.firstName, ' ', u.lastName) like :prefix% " +
            "or concat(u.lastName, '', u.firstName) like :prefix%")
    List<UserInfo> findByFullNamePrefix(@Param("prefix") String prefix);


    @Query("SELECT u FROM UserInfo u " +
            "where u.email like :prefix%  " +
            "or concat(u.firstName, ' ',  u.lastName) LIKE :prefix%")
    List<UserInfo> findByFullNameOrEmailPrefix(@Param("prefix") String prefix);

}
