package com.NinjaCourier.testOtp;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.rest.api.v2010.account.message.*;
import com.twilio.type.PhoneNumber;

import jakarta.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j

public class SMSService {
	
	
	String ACCOUNT_SID = "AC43f6ed3fc184735fad736bb38a3f6e53";
	
	String AUTH_TOKEN = "ac8a4c51d0fe2989e8309ae2af17df74";
	
	
	String OUTGOING_SMS_NUMBER = "+18144694567";
	
	private final Logger log = LoggerFactory.getLogger(getClass());
	
	
	
	@PostConstruct
	private void setup() {
		Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
	}
	
	
	public String sendSMS(String smsNumber, String smsMessage) {
        try {
            Message message = Message.creator(
                    new PhoneNumber(smsNumber),
                    new PhoneNumber(OUTGOING_SMS_NUMBER),
                    smsMessage).create();
            
            log.info("SMS sent with SID: {}", message.getSid());
            return message.getSid();
        } catch (Exception e) {
            log.error("Failed to send SMS", e);
            throw new RuntimeException("Failed to send SMS", e);
        }
}
	}