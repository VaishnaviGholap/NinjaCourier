package com.NinjaCourier.Controller;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
//import com.ninjacourier.testmail.service.SendEmailService;

import com.NinjaCourier.model.Admin;
import com.NinjaCourier.service.SendEmailService;

@RestController
public class EmailController {

	
	@Autowired
	private SendEmailService sendEmailService;
	

	@Autowired 
	AdminController adminController;
	
	@GetMapping("sendEmail")
	public String sendEmail() {
		sendEmailService.sendEmail("adminController.createAdmin().email", "\"Dear [Recipient's Name],\r\n"
				+ "\r\n"
				+ "We are pleased to inform you that your parcel has been successfully dispatched from our warehouse and is on its way to you. You can expect to receive yourpackage soon.\r\n"
				+ "\r\n"
				+ "Thank you for choosing NinjaCourier Service.\r\n"
				+ "\r\n"
				+ "Best regards, NinjaCourier Team\"\r\n"
				+ "\r\n"
				+ "Let me know if you need any further assistance!", "FinalProject");
		return "Sent Succesfully";
	}
	
	@GetMapping("agentEmail")
	public String agentEmail() {
		sendEmailService.sendAgentEmail("agentController.createAgent().email", "\"Dear [Recipient's Name],\r\n"
				+ "\r\n"
				+ "We are excited to inform you that a new order has been assigned to you. Below are the details of the order you are responsible for delivering:\\n\\n\""
				+ "\r\n"
				+ "Thank you for choosing NinjaCourier Service.\r\n"
				+ "\r\n"
				+ "Best regards, NinjaCourier Team\"\r\n"
				+ "\r\n"
				+ "Let me know if you need any further assistance!", "FinalProject");
		return "Sent Succesfully";
	}
	
	@GetMapping("customerEmail")
	public String customerEmail() {
		sendEmailService.sendCustomerEmail("customerController.createCustomer().email", "\"Dear [Recipient's Name],\r\n"
				+ "\r\n"
				+ "We are pleased to inform you that your parcel has been successfully dispatched from our warehouse and is on its way to you. You can expect to receive yourpackage soon.\r\n"
				+ "\r\n"
				+ "Thank you for choosing NinjaCourier Service.\r\n"
				+ "\r\n"
				+ "Best regards, NinjaCourier Team\"\r\n"
				+ "\r\n"
				+ "Let me know if you need any further assistance!", "FinalProject");
		return "Sent Succesfully";
	}
}