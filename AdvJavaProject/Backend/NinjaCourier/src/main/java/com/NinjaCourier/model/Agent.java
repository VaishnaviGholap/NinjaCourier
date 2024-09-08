package com.NinjaCourier.model;

import jakarta.persistence.Entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;

//CREATE TABLE agent (
//	    agentId INT AUTO_INCREMENT PRIMARY KEY,
//	    companyName VARCHAR(255) NOT NULL,
//	    agentName VARCHAR(255) NOT NULL,
//	    phoneNumber VARCHAR(15) NOT NULL,
//	    address VARCHAR(500) NOT NULL,
//	    username VARCHAR(255) NOT NULL UNIQUE,
//	    password VARCHAR(20) NOT NULL,
//	    email VARCHAR(255) NOT NULL UNIQUE,
//	    ratings VARCHAR(1) CHECK (ratings IN ('1', '2', '3', '4', '5')),
//	    otp INT NOT NULL
//	);


@Entity
@Table(name="agent")
public class Agent {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int agentId;
	
	
	@JsonProperty("companyName")
	
	
	private String companyName;
	
	
	@JsonProperty("agentName")
	
	
	private String agentName;
	
	
    private String phoneNumber;
	
	
	@JsonProperty("address")
	
	private String address;
	

    
    @JsonProperty("username")
    
	private String username;
	
    
    @JsonProperty("password")
    
	private String password;
	
   
    @JsonProperty("email")
  
	private String email;
	
	@JsonProperty("ratings")
	
    private String ratings;
	
	@JsonProperty("otp")
	
	private int otp;
	
	public Agent() {}

	public Agent(
			String companyName,
			String agentName,
			String phoneNumber,
			String address,
			String username,
			String password,
			String email,
			String ratings, 
			int otp) {
		
		
		this.companyName = companyName;
		this.agentName = agentName;
		this.phoneNumber = phoneNumber;
		this.address = address;
		this.username = username;
		this.password = password;
		this.email = email;
		this.ratings = ratings;
		this.otp = otp;
	}

	
	public int getAgentId() {
		return agentId;
	}

	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getAgentName() {
		return agentName;
	}

	public void setAgentName(String agentName) {
		this.agentName = agentName;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRatings() {
		return ratings;
	}

	public void setRatings(String ratings) {
		this.ratings = ratings;
	}

	public int getOtp() {
		return otp;
	}

	public void setOtp(int otp) {
		this.otp = otp;
	}

	@Override
	public String toString() {
		return "Agent [agentId=" + agentId + ", companyName=" + companyName + ", agentName=" + agentName
				+ ", phoneNumber=" + phoneNumber + ", address=" + address + ", username=" + username + ", password="
				+ password + ", email=" + email + ", ratings=" + ratings + ", otp=" + otp + "]";
	};
	
	
	
}
