package com.project.collab_tool.controller;


import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    public String test() {
        return "test-success";
    }
}
