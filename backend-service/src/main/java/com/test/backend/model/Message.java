package com.test.backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Message {
    @Id
    private String username;
    private String message;
    public Message(){

    }

    @Override
    public String toString() {
        return "message{" +
                "username='" + username + '\'' +
                ", message='" + message + '\'' +
                '}';
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
