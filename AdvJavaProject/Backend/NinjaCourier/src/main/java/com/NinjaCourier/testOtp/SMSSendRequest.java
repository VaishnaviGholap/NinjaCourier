package com.NinjaCourier.testOtp;

import lombok.Data;

@Data
public class SMSSendRequest {

	private String destinationSMSNumber;
	private String smsMessages;
	
	public String getDestinationSMSNumber() {
		return destinationSMSNumber;
	}
	
	public void setDestinationSMSNumber(String destinationSMSNumber) {
		this.destinationSMSNumber = destinationSMSNumber;
	}

	public void setSmsMessages(String smsMessages) {
		this.smsMessages = smsMessages;
	}

	public String getSmsMessages() {
		return smsMessages;
	}

	public SMSSendRequest(String destinationSMSNumber, String smsMessages) {
		
		this.destinationSMSNumber = destinationSMSNumber;
		this.smsMessages = smsMessages;
	}

	
	
	
	
	
}