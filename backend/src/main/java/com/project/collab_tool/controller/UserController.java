package com.project.collab_tool.controller;


import com.project.collab_tool.dto.MemberRequest;
import com.project.collab_tool.dto.UserResponse;
import com.project.collab_tool.dto.UsersSearchRequest;
import com.project.collab_tool.model.UserInfo;
import com.project.collab_tool.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;


    @GetMapping
    public List<UserResponse> getUsers(Authentication authentication) {
        return userService.getUsers();
    }

    @GetMapping("/search")
    public List<UserResponse> searchUsers(@RequestParam(value = "fullName", required = false) String fullName,
                                          @RequestParam(value = "email", required = false) String email,
                                          @RequestParam(value = "emailOrFullName", required = false) String emailOrFullName) {

        return userService.searchByPrefix(emailOrFullName);
    }

    @PostMapping("/search")
    public List<UserResponse> searchUsers(@RequestBody UsersSearchRequest searchRequest) {
        return userService.searchByPrefixed(searchRequest);
    }


    @PostMapping("/me/team-members")
    public ResponseEntity<String> addMember(JwtAuthenticationToken authentication, @RequestBody MemberRequest newMember) {
        var principle = (UserInfo) authentication.getDetails();
        userService.addMemberToTeam(principle.getId(), newMember.getId());
        return ResponseEntity.ok("Added member successfully");
    }

    @DeleteMapping("/me/team-members/{id}")
    public ResponseEntity<String> removeMember(JwtAuthenticationToken authentication, @PathVariable Long id) {
        var principle = (UserInfo) authentication.getDetails();
        userService.removeMember(principle.getId(), id);
        return ResponseEntity.ok("Removed member successfully");
    }

    @GetMapping("/me/team-members")
    public List<UserResponse> getTeamMembers(JwtAuthenticationToken authentication) {
        UserInfo userInfo = (UserInfo) authentication.getDetails();
        return userService.getTeamMembers(userInfo.getId());
    }

    @GetMapping("/{id}")
    public UserResponse getUserId(@PathVariable long id) {
        return userService.getUser(id);
    }

}
