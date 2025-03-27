package com.test.backend.service;

import com.test.backend.model.Expenses;
import com.test.backend.repo.ExpensesRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ExpensesService {
    @Autowired
    ExpensesRepository expensesRepository;
    @Autowired
    JwtService jwtService;
    public List<Expenses> getUserExpenses(String token){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        return expensesRepository.findByUsername(username);
    }
    public ResponseEntity<?> saveExpenses(String token, Expenses requestBody){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        Expenses expense=new Expenses();

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Kolkata"));
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd-MMM-yyyy");
        String date = now.format(dateFormatter);
        DateTimeFormatter timeFormatter = DateTimeFormatter.ofPattern("HH:mm:ss.SSS");
        String time = now.format(timeFormatter);

        expense.setUsername(username);
        expense.setCategory(requestBody.getCategory());
        expense.setSubcategory(requestBody.getSubcategory());
        expense.setQuantity(requestBody.getQuantity());
        expense.setPrice(requestBody.getPrice());
        expense.setConsumer(requestBody.getConsumer());
        expense.setNecessity(requestBody.getNecessity());
        expense.setDate(date);
        expense.setTime(time);
        return ResponseEntity.ok(expensesRepository.save(expense));
    }
    @Transactional
    public ResponseEntity<?> deleteExpenses(String token, String time){
        String username=jwtService.extractUserName(token.replace("Bearer ",""));
        expensesRepository.deleteByUsernameAndTime(username,time);
        return ResponseEntity.ok("Expenses Deleted Successfully");
    }

    @Transactional
    @Modifying
    public ResponseEntity<?> updateExpenses(String token, Expenses requestBody){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));
        Expenses expense=expensesRepository.findByUsernameAndTime(username,requestBody.getTime());

        expense.setCategory(requestBody.getCategory());
        expense.setSubcategory(requestBody.getSubcategory());
        expense.setQuantity(requestBody.getQuantity());
        expense.setPrice(requestBody.getPrice());
        expense.setConsumer(requestBody.getConsumer());
        expense.setNecessity(requestBody.getNecessity());

        return ResponseEntity.ok(expensesRepository.save(expense));
    }
    public List<Expenses> getExpensesByFilter(String token,String type,String value){
        String username=jwtService.extractUserName(token.replace("Bearer ", ""));

        return switch (type) {
            case "Category" -> expensesRepository.findByUsernameAndCategory(username, value);
            case "Subcategory" -> expensesRepository.findByUsernameAndSubcategory(username, value);
            case "Necessity" -> expensesRepository.findByUsernameAndNecessity(username, value);
            default -> null;
        };
    }
}
