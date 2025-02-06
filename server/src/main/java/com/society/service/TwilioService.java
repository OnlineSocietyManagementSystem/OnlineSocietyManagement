package com.society.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class TwilioService {

	 @Value("${twilio.account.sid}")
	    private String accountSid;

	    @Value("${twilio.auth.token}")
	    private String authToken;

	    @Value("${twilio.phone.number}")
	    private String fromPhoneNumber;

	    public void sendSms(String to, String message) {
	        Twilio.init(accountSid, authToken);
	        Message.creator(new com.twilio.type.PhoneNumber(to),
	                        new com.twilio.type.PhoneNumber(fromPhoneNumber),
	                        message)
	               .create();
	    }
}
