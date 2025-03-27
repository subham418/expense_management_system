package com.test.backend.service;

import com.test.backend.model.Message;
import com.test.backend.repo.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MessageService {
    @Autowired
    JwtService jwtService;
    @Autowired
    MessageRepository messageRepository;

    public ResponseEntity<?> updateMessage(String token,Message newMessage){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        Optional<Message> message=messageRepository.findById(username);
        if(message.isPresent()){
            Message temp=message.get();
            temp.setMessage(newMessage.getMessage());
            messageRepository.save(temp);
        }
        else {
            setDefaultMessage(username);
        }
        return ResponseEntity.ok("Message Updated Successfully");
    }
    public ResponseEntity<?> deleteMessage(String token){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        setDefaultMessage(username);
        return ResponseEntity.ok("Message Set to default message");
    }
    public ResponseEntity<?> getMessage(String token){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        Optional<Message> message=messageRepository.findById(username);
        if(message.isPresent()){
            return ResponseEntity.ok(message.get().getMessage());
        }
        else{
            setDefaultMessage(username);
            return getMessage(token);
        }
    }
    private void setDefaultMessage(String username){
        Message message =new Message();
        message.setMessage("Hello User, Welcome!");
        message.setUsername(username);
        messageRepository.save(message);
    }
}
