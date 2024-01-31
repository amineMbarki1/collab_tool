package com.project.collab_tool.dto;



import lombok.*;
import org.springframework.beans.factory.annotation.Configurable;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
@Configurable
public class UserResponse {
    private String email;
    private String firstName;
    private String lastName;
    private Long id;
}
