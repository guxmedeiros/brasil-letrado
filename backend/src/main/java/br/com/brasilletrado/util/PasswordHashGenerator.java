package br.com.brasilletrado.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "123456";
        String hashedPassword = encoder.encode(rawPassword);
        
        System.out.println("Senha original: " + rawPassword);
        System.out.println("Hash BCrypt gerado: " + hashedPassword);
        System.out.println("\nSQL para atualizar:");
        System.out.println("UPDATE instituicao SET senha = '" + hashedPassword + "' WHERE id = 1;");
    }
}