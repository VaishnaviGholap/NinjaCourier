package com.NinjaCourier.model;

public class AdminResponse {

	private String token;
	private Admin user;
	public String getJwt() {
		return token;
	}
	public void setJwt(String jwt) {
		this.token = jwt;
	}
	public Admin getAgent() {
		return user;
	}
	public void setAgent(Admin agent) {
		this.user = agent;
	}
	public AdminResponse(String jwt, Admin agent) {
		
		this.token = jwt;
		this.user = agent;
	}
	
	public AdminResponse() {}
}
