package com.test.backend.service;

import com.test.backend.model.MyEmployeeDetails;
import com.test.backend.model.Employee;
import com.test.backend.repo.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class EmployeeDetailedService implements UserDetailsService {
    @Autowired
    EmployeeRepository employeeRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByUsername(username);
        if(employee ==null){
            System.out.println("User Not Found");
            throw new UsernameNotFoundException("User Not found");
        }
        return new MyEmployeeDetails(employee);
    }
}
