package com.project.collab_tool.dto;


import lombok.*;

@NoArgsConstructor
@Getter
@Setter
@Builder
@AllArgsConstructor
public class UsersSearchRequest {

    private String fullName;
    private String email;


    private String emailOrFullName;
}
