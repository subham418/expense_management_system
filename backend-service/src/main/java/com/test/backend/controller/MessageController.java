package com.test.backend.controller;

import com.test.backend.model.Message;
import com.test.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/message")
@CrossOrigin(origins = "*")
public class MessageController {
    @Autowired
    MessageService messageService;
    @PatchMapping("/update")
    public ResponseEntity<?> updateMessage(@RequestHeader("Authorization") String token, @RequestBody Message message){
        return messageService.updateMessage(token,message);
    }
    @PatchMapping("/delete")
    public ResponseEntity<?> deleteMessage(@RequestHeader("Authorization") String token){
        return messageService.deleteMessage(token);
    }
}
