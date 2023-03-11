package springboot.restful.service;

import javax.mail.MessagingException;

public interface EmailSenderService {

    void sendEmail(String toEmail, String subject, String body) throws MessagingException;

    String htmlEmailVerificationCodeRegister(String code, String name);

    String htmlEmailVerificationCodeForgotPassword(String code, String name);

    String htmlEmailResetPassword(String password);
}
