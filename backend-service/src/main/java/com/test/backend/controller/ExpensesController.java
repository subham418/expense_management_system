package com.test.backend.controller;

import com.test.backend.model.Expenses;
import com.test.backend.service.ExpensesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/expense")
@CrossOrigin(origins = "*")
public class ExpensesController {
    @Autowired
    ExpensesService expensesService;
    @GetMapping("/get")
    public List<Expenses> getUserExpense(@RequestHeader("Authorization")String token){
        return expensesService.getUserExpenses(token);
    }
    @DeleteMapping("/delete/{time}")
    public ResponseEntity<?> deleteExpenses(@RequestHeader("Authorization")String token, @PathVariable String time){
        return expensesService.deleteExpenses(token,time);
    }
    @PostMapping("/save")
    public ResponseEntity<?> saveExpenses(@RequestHeader("Authorization")String token,@RequestBody Expenses expenses){
        return expensesService.saveExpenses(token,expenses);
    }
    @PatchMapping("update")
    public ResponseEntity<?> updateExpenses(@RequestHeader("Authorization")String token,@RequestBody Expenses expenses){
        return expensesService.updateExpenses(token,expenses);
    }
    @GetMapping("/filter/{type}/{value}")
    public List<Expenses> getExpensesByFilter(@RequestHeader("Authorization")String token,@PathVariable String type, @PathVariable String value){
        return expensesService.getExpensesByFilter(token,type,value);
    }
}
