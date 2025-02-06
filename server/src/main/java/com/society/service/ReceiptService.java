package com.society.service;
import java.io.IOException;

public interface ReceiptService {

	void generateAndSendReceipt(String email, double amount)throws IOException;

}
