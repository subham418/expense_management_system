package com.test.backend.controller;

import com.test.backend.model.Employee;
import com.test.backend.service.EmployeeService;
import com.test.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")
public class EmployeeController {
    @Autowired
    EmployeeService service;
    @Autowired
    MessageService messageService;
    @GetMapping("/check")
    public ResponseEntity<?> greet(@RequestHeader("Authorization") String token){
        return messageService.getMessage(token);
    }
    @GetMapping("/getAll")
    public List<Employee> getUsers(){
        return service.getUserList();
    }
    @DeleteMapping("/delete/{id}")
    public String deleteUser(@PathVariable int id){
        return service.deleteUser(id);
    }
    @PostMapping("/login")
    public String login(@RequestBody Employee employee){
        return service.loginUser(employee);
    }
    @PostMapping("register")
    public void registerEmployee(@RequestBody Employee employee){
        service.registerUser(employee);
    }
    @GetMapping("/details")
    public ResponseEntity<?> getUserDetails(@RequestHeader("Authorization") String token){
        return service.getUserDetails(token);
    }
    @PostMapping("/validate-token")
    public ResponseEntity<?> validateToken(@RequestHeader("Authorization") String token){
        return service.validateBlackedListedToken(token);
    }
    @PostMapping("/logout")
    public ResponseEntity<?> userLogout(@RequestHeader("Authorization") String token){
        return service.logoutUser(token);
    }
}
