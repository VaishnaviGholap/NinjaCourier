package com.NinjaCourier.model;

import jakarta.persistence.Entity;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

import java.sql.Date;
import java.util.Random;

import com.fasterxml.jackson.annotation.*;

import jakarta.persistence.*;



@Entity
@Table(name="order_table")
public class Order {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	
	@JsonProperty("name")
	
	private String name;
	
	
	@JsonProperty("phoneNumber")
   
	private String phoneNumber;
	
	
	@JsonProperty("email")
	
	private String email;

	@JsonProperty("pickup")
	
	private String pickup;
	
	
	@JsonProperty("destination")
	
	private String destination;

	
	@JsonProperty("oDate")
	
	private String oDate;
	
	
	@JsonProperty("dDate")
	
	private String dDate;
	
	
	@JsonProperty("trackingID")
	
	private String trackingID;
	
	
	@JsonProperty("customerId")
    private int customerId;

    
	@JsonProperty("agentId")
    private int agentId;
	
	

	

	public Order() {
		
	}




	public Order(String name, String phoneNumber, String email, String pickup, String destination, String oDate,
			String dDate, String trackingID, int customerId, int agentId) {
		
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.pickup = pickup;
		this.destination = destination;
		this.oDate = oDate;
		this.dDate = dDate;
		this.trackingID = trackingID;
		this.customerId = customerId;
		this.agentId = agentId;
	}


	
	
	public Integer getId() {
		return id;
	}




	public void setId(Integer id) {
		this.id = id;
	}




	public String getName() {
		return name;
	}




	public void setName(String name) {
		this.name = name;
	}




	public String getPhoneNumber() {
		return phoneNumber;
	}




	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}




	public String getEmail() {
		return email;
	}




	public void setEmail(String email) {
		this.email = email;
	}




	public String getPickup() {
		return pickup;
	}




	public void setPickup(String pickup) {
		this.pickup = pickup;
	}




	public String getDestination() {
		return destination;
	}




	public void setDestination(String destination) {
		this.destination = destination;
	}




	public String getoDate() {
		return oDate;
	}




	public void setoDate(String oDate) {
		this.oDate = oDate;
	}




	public String getdDate() {
		return dDate;
	}




	public void setdDate(String dDate) {
		this.dDate = dDate;
	}




	public String getTrackingID() {
		return trackingID;
	}




	public void setTrackingID(String trackingID) {
		this.trackingID = trackingID;
	}




	public int getCustomerId() {
		return customerId;
	}




	public void setCustomerId(int customerId) {
		this.customerId = customerId;
	}




	public int getAgentId() {
		return agentId;
	}




	public void setAgentId(int agentId) {
		this.agentId = agentId;
	}




	public static String getTrackId() {
        Random random = new Random();
        
        // Define possible characters for alphanumeric string
        final String alphaChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        final String numChars = "0123456789";

        StringBuilder builder = new StringBuilder(10); // Length of 10

        // First character (digit 1-9)
        builder.append(numChars.charAt(random.nextInt(numChars.length() - 1) + 1));

        // Second character (digit 0-9)
        builder.append(numChars.charAt(random.nextInt(numChars.length())));

        // Remaining 6 characters (alphabetical)
        for (int i = 0; i < 6; i++) {
            builder.append(alphaChars.charAt(random.nextInt(alphaChars.length())));
        }
        
        // Last two characters (digits 0-9)
        builder.append(numChars.charAt(random.nextInt(numChars.length())));
        builder.append(numChars.charAt(random.nextInt(numChars.length())));
        
        return builder.toString();
    }

	
}
