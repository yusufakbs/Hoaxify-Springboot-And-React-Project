package com.hoaxify.ws.service;

import com.hoaxify.ws.configuration.HoaxifyProperties;
import jakarta.annotation.PostConstruct;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.util.Properties;

@Service
public class EmailService {

    JavaMailSenderImpl mailSender;

    @Autowired
    HoaxifyProperties hoaxifyProperties;

    @Autowired
    MessageSource messageSource;


    //Const. olusturulduktan sonra bu method islevsellik kazaniyor.
    @PostConstruct
    public void initializeMailSender() {
        this.mailSender = new JavaMailSenderImpl();
        mailSender.setHost(hoaxifyProperties.getEmail().host());
        mailSender.setPort(hoaxifyProperties.getEmail().port());
        mailSender.setUsername(hoaxifyProperties.getEmail().username());
        //${HOAXIFY_EMAIL_PASSWORD} = wS5qdjBp65AqjtUcQ4
        mailSender.setPassword(hoaxifyProperties.getEmail().password());
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.smtp.starttls.enable", "true");
    }

    String activationEmail = """
            <html>
            <body>
            <h1>${title}</h1>
            <a href="${url}" target="_blank">${clickHere}</a>
            </body>
            </html>
            """;

    public void sendActivationEmail(String email, String activationToken) {
        var activationUrl = hoaxifyProperties.getClient().host() + "/activation/" + activationToken;
        var title = messageSource.getMessage("hoaxify.mail.user.created.title", null, LocaleContextHolder.getLocale());
        var clickHere = messageSource.getMessage("hoaxify.mail.user.click.here", null, LocaleContextHolder.getLocale());
        var mailBody = activationEmail.replace("${url}", activationUrl).replace("${title}", title).replace("${clickHere}", clickHere);
        MimeMessage mimeMessage = mailSender.createMimeMessage();
        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, "UTF-8");
        try {
            message.setFrom(hoaxifyProperties.getEmail().from());
            message.setTo(email);
            message.setSubject(title);
            message.setText(mailBody, true);
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        this.mailSender.send(mimeMessage);
    }
}
