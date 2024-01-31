package com.project.collab_tool.model;


import jakarta.persistence.Entity;
import lombok.*;



@Entity
@Getter
@Setter
@NoArgsConstructor
public class OauthUserInfo extends UserInfo {



    private String sub;


}
