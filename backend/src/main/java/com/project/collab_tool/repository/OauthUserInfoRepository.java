package com.project.collab_tool.repository;

import com.project.collab_tool.model.OauthUserInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OauthUserInfoRepository extends JpaRepository< OauthUserInfo, Long> {
    Optional<OauthUserInfo> findBySub(String sub);
}
