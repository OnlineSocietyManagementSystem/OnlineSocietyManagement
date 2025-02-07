package com.society.service;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.util.logging.Logger;
import jakarta.mail.internet.MimeMessage;

@Service
@Transactional
public class ReceiptServiceImpl implements ReceiptService {

    private static final Logger logger = Logger.getLogger(ReceiptServiceImpl.class.getName()); 
    
    @Autowired
    private JavaMailSender mailSender;

    @Override
    public void generateAndSendReceipt(String email, double amount) throws IOException {
        logger.info("Start: Generating PDF receipt...");

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
        PDDocument document = new PDDocument();
        PDPage page = new PDPage();
        document.addPage(page);

        PDPageContentStream contentStream = new PDPageContentStream(document, page);
        contentStream.beginText();
        contentStream.setFont(PDType1Font.HELVETICA_BOLD, 20);
        contentStream.setLeading(14.5f);
        contentStream.newLineAtOffset(25, 700);
        contentStream.showText("Receipt");
        contentStream.newLine();
        contentStream.setFont(PDType1Font.HELVETICA, 12);
        contentStream.showText("Amount: rs" + amount);
        contentStream.newLine();
        contentStream.showText("Date: " + LocalDate.now());
        contentStream.endText();
        contentStream.close();

        document.save(outputStream);
        document.close();

        logger.info("PDF receipt generated successfully.");

        try {
            // Send email with the generated receipt
            logger.info("Sending email to: " + email);
            sendEmailWithAttachment(email, "Payment Receipt", "Thank you for your payment. Please find the receipt attached.", outputStream.toByteArray());
        } catch (Exception e) {
            logger.severe("Error occurred while sending email: " + e.getMessage());
            throw new IOException("Error sending receipt email", e);
        }
    }

    private void sendEmailWithAttachment(String to, String subject, String text, byte[] attachment) {
        try {
            // Create MimeMessage using Jakarta mail
            MimeMessage message = mailSender.createMimeMessage();
            
            // Create MimeMessageHelper
            MimeMessageHelper helper = new MimeMessageHelper(message, true);  // 'true' for multipart
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(text);
            helper.addAttachment("receipt.pdf", new ByteArrayResource(attachment));

            // Send the email
            mailSender.send(message);
            logger.info("Email sent successfully to " + to);
        } catch (Exception e) {
            logger.severe("Error sending email: " + e.getMessage());
            e.printStackTrace();
        }
    }

}
