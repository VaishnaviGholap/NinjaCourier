package com.NinjaCourier.testOtp;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Slf4j
public class SendOtp {
	
    private final Logger log = LoggerFactory.getLogger(getClass());


    @Autowired
    private SMSService smsService;

    
    public String processSMS(String destinationSMSNumber,String smsMessages) {
        
    	 try {
    		 log.info("Received request with destinationSMSNumber: {}", destinationSMSNumber);
     	    log.info("Received request with smsMessage: {}", smsMessages);

         
         return smsService.sendSMS(destinationSMSNumber, smsMessages);
		} catch (Exception e) {
			// TODO: handle exception
			return (e.toString());
		}
    }
}