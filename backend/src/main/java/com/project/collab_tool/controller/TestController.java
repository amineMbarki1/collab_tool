package com.project.collab_tool.controller;


import org.springframework.context.ApplicationEvent;
import org.springframework.context.event.EventListener;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController


public class TestController {

    private List<SseEmitter> emitters = new ArrayList<>();

    public String test() {
        return "test-success";
    }

    @GetMapping("/sse/{id}")
    public SseEmitter streamSseMvc(@PathVariable String id) throws IOException {
        SseEmitter emitter = new SseEmitter(0L);
        emitters.add(emitter);
        return emitter;
    }

    @EventListener
    public void listener(ApplicationEvent applicationEvent)  {
        emitters.forEach(emitter -> {
            SseEmitter.SseEventBuilder event = SseEmitter.event()
                    .data("SSE MVC - ")
                    .id("id")
                    .name("sse event - mvc");
            try {
                emitter.send(event);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        });
    }




}
