package com.society.controllers;

import com.society.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

@RestController
public class ReceiptController {

    private static final Logger logger = Logger.getLogger(ReceiptController.class.getName());

    @Autowired
    private ReceiptService receiptService;

    @PostMapping("/generate-receipt")
    public ResponseEntity<String> generateReceipt(@RequestBody Map<String, Object> payload) {
        String email = (String) payload.get("email");
        double amount = ((Number) payload.get("amount")).doubleValue();

        try {
            // Validate input
            if (email == null || email.isEmpty()) {
                logger.warning("Received empty email address.");
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email address is required.");
            }

            if (amount <= 0) {
                logger.warning("Received invalid amount: " + amount);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Amount must be greater than zero.");
            }

            // Generate and send receipt
            logger.info("Generating receipt for email: " + email + " with amount: " + amount);
            receiptService.generateAndSendReceipt(email, amount);

            return ResponseEntity.ok("Receipt generated and email sent successfully");
        } catch (IOException e) {
            logger.severe("IOException occurred while generating or sending the receipt: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to generate or send receipt due to an internal error.");
        } catch (Exception e) {
            logger.severe("Unexpected error occurred: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Unexpected error occurred while processing the request.");
        }
    }
}
