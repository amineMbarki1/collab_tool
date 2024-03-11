package com.project.collab_tool.service;

import java.util.ArrayList;
import java.util.List;

public class NotificationPublisher {

    private List<NotificationSubscriber> subscribers = new ArrayList<>();

    public void subscribe(NotificationSubscriber subscriber) {
        this.subscribers.add(subscriber);
    }

    public void unsubscribe(NotificationSubscriber subscriber) {
        this.subscribers.remove(subscriber);
    }

    public void updateSubscribers() {
        this.subscribers.forEach(subscriber -> subscriber.update());
    }

}
