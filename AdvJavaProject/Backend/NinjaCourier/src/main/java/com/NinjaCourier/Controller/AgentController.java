package com.NinjaCourier.Controller;

import com.NinjaCourier.AddModal.AddAgent;
import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.AdminResponse;

import com.NinjaCourier.model.Agent;
import com.NinjaCourier.model.AgentResponse;
import com.NinjaCourier.model.Customer;
import com.NinjaCourier.repository.AgentRepository;
import com.NinjaCourier.request.LoginRequest;
import com.NinjaCourier.security.JwtProvider;
import com.NinjaCourier.service.AgentUserDetailsService;
import com.NinjaCourier.service.SendEmailService;
import com.NinjaCourier.testOtp.OtpGet;
import com.NinjaCourier.testOtp.SMSService;
import com.NinjaCourier.testOtp.SendOtp;
import com.NinjaCourier.testOtp.resetPass;

import java.security.SecureRandom;
import java.util.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


@RestController


public class AgentController {

	@Autowired
	AgentRepository ar;
	
	 @Autowired
	    SMSService sms;
	
	@Autowired
	private SendEmailService sendEmailService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private AgentUserDetailsService agentUserDetailsService;
	
	@PostMapping("/Agents")
	public ResponseEntity<String> createAgent(@RequestBody AddAgent add){
		Agent agent = new Agent(add.getCompanyName(),add.getAgentName(),add.getPhoneNumber(),add.getAddress(),add.getUsername(),add.getPassword(),add.getEmail(),"4",0);
	
		agent.setPassword(passwordEncoder.encode(agent.getPassword()));
		ar.save(agent);
		 try {
	            sendEmailService.sendAgentEmail(
	                agent.getEmail(),
	                "Dear " + agent.getAgentName() + ",\n\n" +
	                "Your agent account has been successfully created. Welcome to NinjaCourier.\n\n" +
	                "Best regards,\nNinjaCourier Team",
	                "Agent Registration Successful"
	            );
	        } catch (Exception e) {
	            e.printStackTrace(); // Log the exception
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
	        }
	        return ResponseEntity.ok("Agent data is saved and email sent");
		
		
	}
	
	@GetMapping("/api/Agents")
	public ResponseEntity<List<Agent>> getAllAgents(){
		List<Agent> list = new ArrayList<>();
		ar.findAll().forEach(list::add);
		return ResponseEntity.ok(list);
	}
	
	
	
	@GetMapping("/api/Agents/{id}")
	public ResponseEntity<Agent> getById(@PathVariable int id){
		Optional<Agent> agent = ar.findById(id);
		if(agent.isPresent()) {
			return new ResponseEntity<Agent>(agent.get(),HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Agent>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("/api/Agents/{id}")
	public String updateAgent(@PathVariable int id,@RequestBody AddAgent agent) {
		Optional<Agent> agentinfo = ar.findById(id);
		if(agentinfo.isPresent()) {
			Agent age = agentinfo.get();
			age.setCompanyName(agent.getCompanyName());
			age.setAgentName(agent.getAgentName());
			age.setPhoneNumber(agent.getPhoneNumber());
			age.setAddress(agent.getAddress());
			age.setUsername(agent.getUsername());
			age.setPassword(passwordEncoder.encode(agent.getPassword()));
			age.setEmail(agent.getEmail());
			age.setRatings("4");
			
			ar.save(age);
			return "Agent data is updated for id: "+id;
		}
		else
		{
			return "Agent id is not found";
		}
	}
	
//	@DeleteMapping("/Agents")
//	public String deleteAll() {
//		ar.deleteAll();
//		return "All agents has been removed";
//	}
	
	@DeleteMapping("/api/Agents/{id}")
	public String deleteById(@PathVariable int id) {
			ar.deleteById(id);
			return "Agent is deleted with id: "+id;
	}
	

	 
	 
	 @PostMapping("/Agents/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
	 
	 try {
	        Optional<Agent> agent = ar.findByUsername(req.getUsername());
	        if (!agent.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	        
	        Agent ag = agent.get();
	        Authentication authentication = authenticate(req.getUsername(), req.getPassword());
	        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
	        String jwt = jwtProvider.generateToken(authentication);
	        AgentResponse arr = new AgentResponse(jwt, ag);
	        try {
                sendEmailService.sendAgentEmail(
                    ag.getEmail(),
                    "Dear " + ag.getAgentName() + ",\n\n" +
                    "You have successfully logged into your agent account.\n\n" +
                    "Best regards,\nNinjaCourier Team",
                    "Login Successful"
                );
            } catch (Exception e) {
                e.printStackTrace(); // Log the exception
                // Optionally, you might still return a success response even if sending the email fails
            }
	        return ResponseEntity.ok(arr);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed: " + e.getMessage());
	    }}

	 private Authentication authenticate(String username, String password) {
			UserDetails userDetails = agentUserDetailsService.loadUserByUsername(username);
		   
			if(userDetails==null) {
				throw new BadCredentialsException("invalid username");
			}
			
			if(!passwordEncoder.matches(password, userDetails.getPassword())) {
				throw new BadCredentialsException("Invalid Password");
			}
			return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
		}
	 
	 @GetMapping("/Agents/forget/{username}")
	    public ResponseEntity<?> forgetPassword(@PathVariable String username) {
	        Optional<Agent> agent = ar.findByUsername(username);
	        if (agent.isPresent()) {
	        	Agent ag = agent.get();
	        	SecureRandom secureRandom = new SecureRandom();
	            
	        	
	            int lowerBound = 100000; // Lower bound (inclusive)
	            int upperBound = 999999; // Upper bound (inclusive)

	            
	            int otp = secureRandom.nextInt((upperBound - lowerBound) + 1) + lowerBound;
	            
	            String num = "+91"+agent.get().getPhoneNumber(); 
	            String msg = "Your 6's digit OTP => " + otp;
	            
	            
	            
	            
	            sms.sendSMS(num, msg);
	            String n = agent.get().getPhoneNumber();
	            n = n.substring(n.length() - 4);
	            ag.setOtp(otp);
	            ar.save(ag);
	            return new ResponseEntity<>("We have Send the Otp on your mobile number +91-XXXXXX"+n, HttpStatus.OK);
	        } else {
	        	//ErrorResponse errorResponse = new ErrorResponse("User not found.");
	        	return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @PostMapping("/Agents/otp/{username}")
	    public ResponseEntity<?> otpFilled(@PathVariable String username, @RequestBody OtpGet num) {
	        Optional<Agent> customer = ar.findByUsername(username);
	        if (customer.isPresent()) {
	        	if(customer.get().getOtp() == num.getOtp()) {
	        		customer.get().setOtp(0);
	        		ar.save(customer.get());
	        		return new ResponseEntity<>("Otp matched.", HttpStatus.OK);
	        	}
	        	else {
	        		return new ResponseEntity<>("Otp not matched.", HttpStatus.NOT_FOUND);
	        	}
	            
	            
	        } else {
	        	//ErrorResponse errorResponse = new ErrorResponse("User not found.");
	        	return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
	        }
	    }
	    
	    @PostMapping("/Agents/reset/{username}")
	    public ResponseEntity<String> resetPassword(@PathVariable String username, @RequestBody resetPass add) {
	    	Optional<Agent> customer = ar.findByUsername(username);
	    	customer.get().setPassword(passwordEncoder.encode(add.getPassword()));
	    	
	    	ar.save(customer.get());

	        return ResponseEntity.ok("Your Password Has been Changed.");
	    }
	 
	
//	@PostMapping("/agent/login")
//	public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password){
//		Optional<Agent> agent = ar.findByUsername(username);
//		if(agent.isPresent()) {
//			Agent ag = agent.get();
//			if(ag.getPassword().equals(password)) {
//				return ResponseEntity.ok("login successful");
//			}
//			else {
//				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
//			}
//		}
//		else {
//            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//
//		}
//	}
	
}
