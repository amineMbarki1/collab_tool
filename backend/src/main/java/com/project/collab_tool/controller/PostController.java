package com.project.collab_tool.controller;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.project.collab_tool.dto.PostRequest;
import com.project.collab_tool.dto.PostResponse;
import com.project.collab_tool.model.Post;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(("/api/topics/{id}/posts"))
@RequiredArgsConstructor
public class PostController {
    private final PostService postService;

    @PostMapping
    public ResponseEntity<PostResponse> createPost(@RequestBody PostRequest postRequest,
                                                   JwtAuthenticationToken authenticationToken,
                                                   @PathVariable Long id) throws JsonProcessingException {
        var userInfo = (UserInfo) authenticationToken.getDetails();
        postRequest.setUserId(userInfo.getId());
        postRequest.setTopicId(id);
        var response = postService.createPost(postRequest);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts(@PathVariable Long id) {
        var response = postService.getAllPostsByTopicId(id);
        return ResponseEntity.ok(response);
    }

}