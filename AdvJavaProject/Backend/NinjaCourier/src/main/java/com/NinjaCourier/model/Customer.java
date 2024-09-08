package com.NinjaCourier.model;

import jakarta.persistence.Entity;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name="customer")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int customerId;
    
   
    @JsonProperty("name")
   
    private String name;
    
    
    @JsonProperty("phoneNumber")
    
    private String phoneNumber;
    
  
    @JsonProperty("address")
   
    private String address;
    
    
    @JsonProperty("username")
   
    private String username;
    
    
    @JsonProperty("password")
   
    private String password;
    
   
    @JsonProperty("email")
    
   
    private String email;
    
   
    @JsonProperty("otp")
    @Column(nullable = false)
    private int otp;

    public Customer() {}

    public Customer( 
    		String name,
            String phoneNumber,
            String address,
            String username,
            String password,
            String email,
            int otp)
    {
        
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.username = username;
        this.password = password;
        this.email = email;
        this.otp = otp;
    }

    // Getters and Setters

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
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

    public int getOtp() {
        return otp;
    }

    public void setOtp(int otp) {
        this.otp = otp;
    }

    @Override
    public String toString() {
        return "Customer [customerId=" + customerId + ", name=" + name + ", phoneNumber=" + phoneNumber + ", address=" + address + ", username=" + username + ", password=" + password + ", email=" + email + ", otp=" + otp + "]";
    }
}
