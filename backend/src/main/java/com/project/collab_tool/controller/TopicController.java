package com.project.collab_tool.controller;


import com.project.collab_tool.dto.MemberRequest;
import com.project.collab_tool.dto.TopicRequest;
import com.project.collab_tool.dto.TopicResponse;
import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.service.TopicService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/topics")
@RequiredArgsConstructor
public class TopicController {
    private final TopicService topicService;

    @PostMapping
    public ResponseEntity<TopicResponse> createTopic(@RequestBody TopicRequest topicRequest, JwtAuthenticationToken authenticationToken) {
        UserInfo principal = (UserInfo) authenticationToken.getDetails();
        TopicResponse topic = topicService.createTopic(topicRequest, principal.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body(topic);
    }

    @GetMapping
    public ResponseEntity<List<TopicResponse>> getTopics() {
        var topics = topicService.getAllTopics();
        return ResponseEntity.ok().body(topics);
    }

    @PostMapping("/{id}/members")
    @Operation(
            responses = {
                    @ApiResponse(
                            responseCode = "200",
                            content = {
                                    @Content(mediaType = "Application/Json")
                            }
                    )
            }
    )
    public ResponseEntity<String> addMember(JwtAuthenticationToken jwtAuthenticationToken, @RequestBody MemberRequest memberRequest, @PathVariable Long id) {
        UserInfo topicOwner = (UserInfo) jwtAuthenticationToken.getDetails();
        topicService.addMember(memberRequest.getId(), id, topicOwner.getId());
        return ResponseEntity.status(HttpStatus.CREATED).body("Added member successfully");
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<List<UserResponse>> getMembers(@PathVariable Long id) {
        return ResponseEntity.ok().body(topicService.getMembers(id));
    }

    @DeleteMapping("/{topicId}/members/{memberId}")
    public ResponseEntity<String> deleteMember(@PathVariable long topicId,
                                               @PathVariable long memberId,
                                               JwtAuthenticationToken jwtAuthenticationToken) {
        UserInfo user =  (UserInfo) jwtAuthenticationToken.getDetails();
        topicService.verifyOwnership(user.getId(), topicId);
        topicService.deleteMember(memberId, topicId);
        return ResponseEntity.ok("Deleted successfully");
    }


}
