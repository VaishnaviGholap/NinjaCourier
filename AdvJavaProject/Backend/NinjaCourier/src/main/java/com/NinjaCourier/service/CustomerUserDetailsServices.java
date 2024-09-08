package com.NinjaCourier.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.Customer;
import com.NinjaCourier.repository.CustomerRepository;

@Service
public class CustomerUserDetailsServices implements UserDetailsService{
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

		Optional<Customer> customer = customerRepository.findByUsername(username);
		Customer user = customer.get();
		if(user==null) {
			throw new UsernameNotFoundException("User Not Found with email"+username);
		}
		//USER_ROLE role = user.getRole();
		
		List<GrantedAuthority> authorities = new ArrayList<>();
		//authorities.add(new SimpleGrantedAuthority(role.toString()));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
	}
	

}
