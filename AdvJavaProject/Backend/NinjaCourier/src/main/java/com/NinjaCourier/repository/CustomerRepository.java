package com.NinjaCourier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NinjaCourier.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer,Integer>{
	
Optional<Customer> findByUsername(String username);
	
	public  Customer findByEmail(String email);
	

}
