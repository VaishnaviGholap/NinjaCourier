package com.NinjaCourier.Controller;

import java.util.ArrayList;
import java.util.Collection;

import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.util.List;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.AdminResponse;
import com.NinjaCourier.repository.AdminRepository;
import com.NinjaCourier.request.LoginRequest;
import com.NinjaCourier.security.JwtProvider;
import com.NinjaCourier.service.AdminUserDetailsService;
import com.NinjaCourier.service.SendEmailService;
import com.mysql.cj.protocol.x.Ok;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController

public class AdminController {

	@Autowired
	AdminRepository adminrepository;
	
	@Autowired
	private SendEmailService sendEmailService;

	
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtProvider jwtProvider;
	@Autowired
	private AdminUserDetailsService customerUserDetailsService;
	
	@PostMapping("/Admins")
	public ResponseEntity<Admin> createAdmin(@RequestBody Admin admin )
	{
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		adminrepository.save(admin);
		 try {
	            sendEmailService.sendEmail(
	                admin.getEmail(),
	                "Dear " + admin.getName() + ",\n\n" +
	                "Your admin account has been successfully created. Welcome to NinjaCourier.\n\n" +
	                "Best regards,\nNinjaCourier Team",
	                "Admin Registration Successful"
	            );
	        } catch (Exception e) {
	            e.printStackTrace(); // Log the exception
	           // return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
	            return new ResponseEntity<Admin>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
		 return new ResponseEntity<Admin>(admin, HttpStatus.OK);
	}
	
	
	@GetMapping("/api/Admins")
	public ResponseEntity<List<Admin>> getAll(){
		List<Admin> adminList = new ArrayList<>();
		adminrepository.findAll().forEach(adminList::add);
		return ResponseEntity.ok(adminList);
	}
	
	@GetMapping("api/Admins/{id}")
	public ResponseEntity<Admin> getById(@PathVariable int id){
		Optional<Admin> admin = adminrepository.findById(id);
		if(admin.isPresent()) {
			return new ResponseEntity<Admin>(admin.get(), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PostMapping("api/Admins/{id}")
	public ResponseEntity<Admin> update(@PathVariable int id,@RequestBody Admin admin) {
		
		admin.setPassword(passwordEncoder.encode(admin.getPassword()));
		Optional<Admin> adm = adminrepository.findById(id);
		if(adm.isPresent()) {
			Admin admindetails = adm.get();
			admindetails.setName(admin.getName());
			admindetails.setPassword(admin.getPassword());
			admindetails.setEmail(admin.getEmail());
			admindetails.setUsername(admin.getUsername());
			adminrepository.save(admindetails);
			return new ResponseEntity<Admin>(admindetails, HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Admin>(admin, HttpStatus.OK);		}
	}
	
//	@DeleteMapping("/api/Admins")
//	public String deleteAll() {
//		adminrepository.deleteAll();
//		return "Admin deleted succesfully";
//	}
	
	@DeleteMapping("api/Admins/delete/{id}")
	public String deleteById(@PathVariable int id) {
		adminrepository.deleteById(id);
		return "Admin with id= "+id+"is deleted";
	}
	
//	@GetMapping("admin/username/{username}")
//	public ResponseEntity<Admin> getByUsername(@PathVariable String username){
//		Optional<Admin> admin = adminrepository.findByUsername(username);
//		if(admin.isPresent()) {
//			Admin adm = admin.get();
//			return new ResponseEntity<Admin>(adm,HttpStatus.FOUND);
//		}
//		else {
//			return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
//		}
//	}
//	
//	@GetMapping("api/Admins/email/{email}")
//	public ResponseEntity<Admin> getByEmail(@PathVariable String email){
//		Admin adm = adminrepository.findByEmail(email);
//		if(adm!=null){
//			
//			return new ResponseEntity<Admin>(adm,HttpStatus.FOUND);
//		}
//		else {
//			return new ResponseEntity<Admin>(HttpStatus.NOT_FOUND);
//		}
//	}
	
//	@PutMapping("admin/username/{username}")
//	public String updateByUsername(@PathVariable String username,@RequestBody Admin admin) {
//		Optional<Admin> adm = adminrepository.findByUsername(username);
//		if(adm.isPresent()) {
//			Admin admindetails = adm.get();
//			admindetails.setName(admin.getName());
//			admindetails.setPassword(admin.getPassword());
//			admindetails.setEmail(admin.getEmail());
//			admindetails.setUsername(admin.getUsername());
//			return "User with username: "+username+"updated successfully";
//		}
//		else {
//			return "Failed to update the user";
//		}
//	}
	
	 @PostMapping("/Admins/login")
	    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
	 
	 try {
	        Optional<Admin> admin = adminrepository.findByUsername(req.getUsername());
	        if (!admin.isPresent()) {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
	        }
	        
	        Admin adm = admin.get();
	        Authentication authentication = authenticate(req.getUsername(), req.getPassword());
	        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
	        String jwt = jwtProvider.generateToken(authentication);
	        AdminResponse ar = new AdminResponse(jwt,adm);
	        
	        try {
                sendEmailService.sendEmail(
                    adm.getEmail(),
                    "Dear " + adm.getName() + ",\n\n" +
                    "You have successfully logged into your admin account.\n\n" +
                    "Best regards,\nNinjaCourier Team",
                    "Login Successful"
                );
            } catch (Exception e) {
                e.printStackTrace(); // Log the exception
                // Optionally, you might still return a success response even if sending the email fails
            }
	      
	        return ResponseEntity.ok(ar);
	    } catch (Exception e) {
	        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Authentication failed: " + e.getMessage());
	    }}
//	        Optional<Admin> admin = adminrepository.findByUsername(req.getUsername());
////        if (admin.isPresent()) {
//	            Admin adm = admin.get();
//	            
//	            Authentication authentication = authenticate(req.getUsername(),req.getPassword());
//	    		Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
//	    		//String role = authorities.isEmpty()?null:authorities.iterator().next().getAuthority();
//	    		
//	    		String jwt = jwtProvider.generateToken(authentication);
////	            if (adm.getPassword().equals(password)) {
////	                return ResponseEntity.ok("Login successful");
////	            } else {
////	                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
////	            }
////	        } else {
////	            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
////	        }
//	    		return new ResponseEntity<>(jwt, HttpStatus.OK);
//        }
//        else {
//           return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
//        }
//	    		
	    
	 
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
