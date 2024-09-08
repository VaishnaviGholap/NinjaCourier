package com.NinjaCourier.Controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.ErrorResponse;
import org.springframework.web.bind.annotation.*;

import com.NinjaCourier.AddModal.AddCustomer;
import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.AdminResponse;
import com.NinjaCourier.model.Agent;
import com.NinjaCourier.model.AgentResponse;
import com.NinjaCourier.model.Customer;
import com.NinjaCourier.model.CustomerResponse;
import com.NinjaCourier.repository.CustomerRepository;
import com.NinjaCourier.request.LoginRequest;
import com.NinjaCourier.security.JwtProvider;
import com.NinjaCourier.service.AdminUserDetailsService;
import com.NinjaCourier.service.CustomerUserDetailsServices;
import com.NinjaCourier.service.SendEmailService;
import com.NinjaCourier.testOtp.OtpGet;
import com.NinjaCourier.testOtp.SMSService;
import com.NinjaCourier.testOtp.SendOtp;
import com.NinjaCourier.testOtp.resetPass;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@RestController
public class CustomerController {
	
	@Autowired
	private SendEmailService sendEmailService;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private CustomerUserDetailsServices customerUserDetailsService;

    @Autowired
    CustomerRepository customerRepository;
    
    @Autowired
    SMSService sms;
    
    private final Logger log = LoggerFactory.getLogger(getClass());

    @PostMapping("/Customers")
    public ResponseEntity<String> createCustomer(@RequestBody AddCustomer add) {
    	Customer customer = new Customer(add.getName(),add.getPhoneNumber(),add.getAddress(),add.getUsername(),add.getPassword(),add.getEmail(),0);
    	customer.setPassword(passwordEncoder.encode(add.getPassword()));
    	
        customerRepository.save(customer);
        try {
            sendEmailService.sendCustomerEmail(
                customer.getEmail(),
                "Dear " + customer.getName() + ",\n\n" +
                "Your customer account has been successfully created. Welcome to NinjaCourier.\n\n" +
                "Best regards,\nNinjaCourier Team",
                "Agent Registration Successful"
            );
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }

        return ResponseEntity.ok("Customer data is saved and email sent");
    }

    @GetMapping("/api/Customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customerList = new ArrayList<>();
        customerRepository.findAll().forEach(customerList::add);
        return ResponseEntity.ok(customerList);
    }

    @GetMapping("/api/Customers/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable int id) {
        Optional<Customer> customer = customerRepository.findById(id);
        if (customer.isPresent()) {
            return new ResponseEntity<Customer>(customer.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<Customer>(HttpStatus.NOT_FOUND);
        }
    }
    
    @GetMapping("/Customers/forget/{username}")
    public ResponseEntity<?> forgetPassword(@PathVariable String username) {
        Optional<Customer> customer = customerRepository.findByUsername(username);
        if (customer.isPresent()) {
        	Customer c = customer.get();
        	SecureRandom secureRandom = new SecureRandom();
            
        	int lowerBound = 100000; // Lower bound (inclusive)
            int upperBound = 999999; // Upper bound (inclusive)

            // Generate a random number within the range [lowerBound, upperBound]
            int otp = secureRandom.nextInt((upperBound - lowerBound) + 1) + lowerBound;
            SendOtp otp1 = new SendOtp();
            String num = "+91"+customer.get().getPhoneNumber(); 
            String msg = "Your 6's digit OTP => " + otp;
            sms.sendSMS(num, msg);
            //otp1.processSMS(num, msg);
            String n = customer.get().getPhoneNumber();
            n = n.substring(n.length() - 4);
            c.setOtp(otp);
            customerRepository.save(c);
            return new ResponseEntity<>("We have Send the Otp on your mobile number +91-XXXXXX"+n, HttpStatus.OK);
        } else {
        	//ErrorResponse errorResponse = new ErrorResponse("User not found.");
        	return new ResponseEntity<>("User not found.", HttpStatus.NOT_FOUND);
        }
    }
    
    @PostMapping("/Customers/otp/{username}")
    public ResponseEntity<?> otpFilled(@RequestBody OtpGet num, @PathVariable String username ) {
        Optional<Customer> customer = customerRepository.findByUsername(username);
        if (customer.isPresent()) {
        	log.info(customer.get().getOtp()+" "+num.getOtp());
        	if(customer.get().getOtp() == num.getOtp()) {
        		customer.get().setOtp(0);
        		customerRepository.save(customer.get());
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
    
    @PostMapping("/Customers/reset/{username}")
    public ResponseEntity<String> resetPassword(@PathVariable String username, @RequestBody resetPass add) {
    	Optional<Customer> customer = customerRepository.findByUsername(username);
    	customer.get().setPassword(passwordEncoder.encode(add.getPassword()));
    	
        customerRepository.save(customer.get());

        return ResponseEntity.ok("Your Pass Has been Changed");
    }

    @PostMapping("/api/Customers/{id}")
    public String updateCustomer(@PathVariable int id, @RequestBody AddCustomer customer) {
        Optional<Customer> cust = customerRepository.findById(id);
        if (cust.isPresent()) {
            Customer customerDetails = cust.get();
            customerDetails.setName(customer.getName());
            customerDetails.setEmail(customer.getEmail());
            customerDetails.setUsername(customer.getUsername());
            customerDetails.setPassword(passwordEncoder.encode(customer.getPassword()));//passwordEncoder.encode(add.getPassword()
            customerDetails.setPhoneNumber(customer.getPhoneNumber());
            customerDetails.setAddress(customer.getAddress());
            customerRepository.save(customerDetails);
            return "Customer data is updated for id: " + id;
        } else {
            return "Customer id is not found";
        }
    }

//    @DeleteMapping("/api/Customers/delete")
//    public String deleteAllCustomers() {
//        customerRepository.deleteAll();
//        return "All customers have been removed";
//    }

    @DeleteMapping("/api/Customers/{id}")
    public String deleteCustomerById(@PathVariable int id) {
        customerRepository.deleteById(id);
        return "Customer with id= " + id + " is deleted";
    }
    
    @PostMapping("/Customers/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
 
 try {
        Optional<Customer> customer = customerRepository.findByUsername(req.getUsername());
        if (!customer.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
        
        Customer user = customer.get();
        Authentication authentication = authenticate(req.getUsername(), req.getPassword());
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        String token = jwtProvider.generateToken(authentication);
        CustomerResponse arr = new CustomerResponse(token, user);
        
       
   
        return new ResponseEntity<>(arr, HttpStatus.OK);
    } catch (Exception e) {
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed: " + e.getMessage());
    }}
    

    private Authentication authenticate(String username, String password) {
		UserDetails userDetails = customerUserDetailsService.loadUserByUsername(username);
	   
		if(userDetails==null) {
			throw new BadCredentialsException("invalid username");
		}
		
		if(!passwordEncoder.matches(password, userDetails.getPassword())) {
			throw new BadCredentialsException("Invalid Password");
		}
		return new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
	}
    
   
}

