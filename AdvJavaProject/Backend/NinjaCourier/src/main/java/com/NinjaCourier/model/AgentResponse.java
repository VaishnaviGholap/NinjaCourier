package com.NinjaCourier.model;

public class AgentResponse {
	private String token;
	private Agent user;
	public String getJwt() {
		return token;
	}
	public void setJwt(String jwt) {
		this.token = jwt;
	}
	public Agent getAgent() {
		return user;
	}
	public void setAgent(Agent agent) {
		this.user = agent;
	}
	public AgentResponse(String jwt, Agent agent) {
		
		this.token = jwt;
		this.user = agent;
	}
	
	public AgentResponse() {}

}
