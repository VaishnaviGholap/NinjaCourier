package com.NinjaCourier.model;

public class CustomerResponse {

	private String token;
	private Customer customer;
	public CustomerResponse(String token, Customer customer) {
		
		this.token = token;
		this.customer = customer;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer user) {
		this.customer = user;
	}
	
	
	
	
}
