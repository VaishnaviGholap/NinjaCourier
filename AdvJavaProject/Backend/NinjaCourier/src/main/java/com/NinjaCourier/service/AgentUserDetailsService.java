package com.NinjaCourier.service;

import com.NinjaCourier.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import com.NinjaCourier.repository.AgentRepository;



@Service
public class AgentUserDetailsService implements UserDetailsService{

	
	
	@Autowired
	private AgentRepository ar;

//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//
//		Optional<Admin> admin = adminRepository.findByUsername(username);
//		Admin user = admin.get();
//		if(user==null) {
//			throw new UsernameNotFoundException("User Not Found with email"+username);
//		}
//		//USER_ROLE role = user.getRole();
//		
//		List<GrantedAuthority> authorities = new ArrayList<>();
//		//authorities.add(new SimpleGrantedAuthority(role.toString()));
//		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
//	}
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<Agent> agent = ar.findByUsername(username);
		Agent user = agent.get();
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found with email"+username);
		}
		//USER_ROLE role = user.getRole();
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		//authorities.add(new SimpleGrantedAuthority(role.toString()));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
	}
}
