//
//
//

package com.society;

import org.modelmapper.Conditions;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.ui.ModelMap;


@SpringBootApplication//Java Config class - @Configuration => bean config xml file
@ComponentScan(basePackages = "com.society") 
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}
	//configure ModelMapper as a spring bean
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper mapper=new ModelMapper();
		mapper.getConfiguration()
		//data xfer from src props -> dest props iff 
		//->1.  names n data types match
		.setMatchingStrategy(MatchingStrategies.STRICT)
		// && 2, src property is not null 
		.setPropertyCondition(Conditions.isNotNull());
		return mapper;
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
}
