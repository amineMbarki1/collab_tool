package com.project.collab_tool.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;


@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TopicResponse {
    private String name;
    private Long id;
    private String description;
    private Set<String> members = new HashSet<>();
}
