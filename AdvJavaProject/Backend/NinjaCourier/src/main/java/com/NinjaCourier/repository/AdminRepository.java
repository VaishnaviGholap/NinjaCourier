package com.NinjaCourier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.NinjaCourier.model.Admin;

public interface AdminRepository extends JpaRepository<Admin, Integer>{
	Optional<Admin> findByUsername(String Username);
	
	public Admin findByEmail(String Email);
	
	    @Transactional
	    @Modifying
	    @Query("UPDATE Admin a SET a.name = :name, a.password = :password, a.email = :email WHERE a.username = :username")
	    void updateByUsername(String username, String name, String password, String email);
	    
}
