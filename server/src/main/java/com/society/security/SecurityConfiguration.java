package com.society.security;

import java.util.List;

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

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private CustomJWTAuthenticationFilter customJWTAuthenticationFilter;

   @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Enable CORS globally
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/auth/register", "/auth/signin", "/all-complaints",
                                "/v*/api-doc*/**", "/swagger-ui/**", "/all-events", "/all-feedbacks","/all-notices", "/get-society","/my-profile","/update-profile", "/all-resources")
                        .permitAll()
                        .requestMatchers(HttpMethod.OPTIONS).permitAll()
                        // Endpoints accessible only to members
                        .requestMatchers("/member/dashboard", "/member/details/**", "/addComplaint","/my-complaints",
                                "/add-feedback", "/delete-feedback","/update-profile","/get-unpaidpayemnt","/make-payment","/my-payments",  "/add-booking", "/delete-complaint")
                        .hasRole("MEMBER")
                        .requestMatchers("/admin/**", "/add-event", "/add-notice", "/delete-event/**", "/delete-notice",
								"/add-society", "delete-society", "/all-bookings", "/add-resource", "/delete-resource","/add-payment").hasRole("ADMIN")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(customJWTAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);


		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();
		configuration.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:5174")); // Allow
																									// frontend
																									// origin
		configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // Allowed methods
		configuration.setAllowedHeaders(List.of("Authorization", "Content-Type")); // Allowed headers
		configuration.setAllowCredentials(true); // Allow cookies/auth headers

		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
		return config.getAuthenticationManager();
	}

}