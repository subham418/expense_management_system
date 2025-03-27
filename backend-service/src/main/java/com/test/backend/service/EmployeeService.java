package com.test.backend.service;

import com.test.backend.model.Employee;
import com.test.backend.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmployeeService {
    private final Set<String> blackListedTokens=new HashSet<>();
    @Autowired
    private EmployeeRepository employeeRepository;
    @Autowired
    private JwtService jwtService;
    @Autowired
    private AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder(12);
    public ResponseEntity<?> greet(String token){
        String jwt=token.substring(7);
        if(blackListedTokens.contains(jwt)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        return ResponseEntity.ok("Hello User!");
    }
    public List<Employee> getUserList(){
        return employeeRepository.findAll();
    }
    public String deleteUser(int id){
        Employee tempEmployee = employeeRepository.findById(id)
                .orElseThrow();
        employeeRepository.delete(tempEmployee);
        return "User deleted Successfully";
    }
    public String loginUser(Employee employee){
        Authentication authentication= authenticationManager
                .authenticate(new UsernamePasswordAuthenticationToken(employee.getUsername(), employee.getPassword()));
        if(authentication.isAuthenticated()){
            return jwtService.generateToken(employee);
        }
        return "Invalid Credentials";
    }
    public void registerUser(Employee employee){
        employee.setPassword(bCryptPasswordEncoder.encode(employee.getPassword()));
        employeeRepository.save(employee);
    }
    public ResponseEntity<?> getUserDetails(String token){
        String jwt=token.substring(7);
        if(blackListedTokens.contains(jwt)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token");
        }
        System.out.println("Receiving token is: "+token);
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        System.out.println("Checking fetched username: "+username);
        Employee employee=employeeRepository.findByUsername(username);
        if(employee==null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        return ResponseEntity.ok(new LinkedHashMap<>(Map.of(
                "name", employee.getName(),
                "age", employee.getAge(),
                "gender", employee.getGender(),
                "address", employee.getAddress()
        )));
    }
    public ResponseEntity<?> logoutUser(String token){
        String jwt= token.substring(7);
        blackListedTokens.add(jwt);
        return ResponseEntity.ok("Logged out Successfully");
    }
    public ResponseEntity<?> validateBlackedListedToken(String token){
        String jwt=token.substring(7);
        if(jwt == null || blackListedTokens.contains(jwt) || jwtService.isTokenExpired(jwt)){
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Token or Token Expired");
        }
        return ResponseEntity.ok("Valid Token");
    }
}
