package com.test.backend.repo;

import com.test.backend.model.Expenses;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpensesRepository extends JpaRepository<Expenses, Integer> {
    // all crud operation here
    List<Expenses> findByUsername(String username);
    @Transactional
    @Modifying
    void deleteByUsernameAndTime(String username,String entry_time);
    Expenses  findByUsernameAndTime(String username,String entry_time);
    List<Expenses> findByUsernameAndCategory(String username,String category);
    List<Expenses> findByUsernameAndSubcategory(String username,String subcategory);
    List<Expenses> findByUsernameAndNecessity(String username,String necessity);
}
