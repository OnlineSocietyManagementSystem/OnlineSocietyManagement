package com.society.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration // Equivalent to a Spring bean configuration in XML
@EnableWebSecurity // Enables Spring Security for the application
public class SecurityConfiguration {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;

    // Configure the Security Filter Chain
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // 1. Disable CSRF since we're using JWT for authentication
            .csrf(csrf -> csrf.disable())

            // 2. Configure URL-based access control
            .authorizeHttpRequests(auth -> auth
                // Publicly accessible endpoints
                .requestMatchers(
                    "/member/register", "/member/signin",
                    "/v*/api-doc*/**", "/swagger-ui/**"
                ).permitAll()
                
                // Allow preflight requests for CORS
                .requestMatchers(HttpMethod.OPTIONS).permitAll()
                
                // Endpoints accessible only to members
                .requestMatchers("/member/dashboard", "/member/details/**","/payment")
                .hasRole("MEMBER")

                // Endpoints accessible only to admins
                .requestMatchers("/admin/**").hasRole("ADMIN")
                
                // Any other request requires authentication
                .anyRequest().authenticated()
            )

            // 3. Configure session management to be stateless
            .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            )

            // 4. Add the custom JWT authentication filter before the UsernamePasswordAuthenticationFilter
            .addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Define the AuthenticationManager bean
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
