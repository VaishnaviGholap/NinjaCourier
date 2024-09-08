package com.NinjaCourier.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.NinjaCourier.model.Agent;

public interface AgentRepository extends JpaRepository<Agent,Integer> 
{
	Optional<Agent> findByUsername(String username);
	
	public Agent findByEmail(String email);
}
