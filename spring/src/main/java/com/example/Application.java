package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.model.LoginModel;
import com.example.model.UserModel;
import com.example.repository.LoginRepository;
import com.example.repository.UserRepository;

@SpringBootApplication
public class Application implements CommandLineRunner {    
	@Autowired
	private UserRepository ur;
	@Autowired
	private LoginRepository lr;
	
	public static void main(String[] args) { 
		SpringApplication.run(Application.class, args);
	}
	
	@Override
    public void run(String...args) throws Exception {   
       if(ur.filterByEmail("admin") == 0) {
    	   UserModel um = new UserModel();
    	   um.setEmail("admin");
    	   um.setPassword("admin");
    	   um.setRole("admin");
    	   um.setUsername("admin");
    	   
           LoginModel lm = new LoginModel();
           lm.setEmail("admin");
           lm.setPassword("admin");
           
           ur.save(um);
           lr.save(lm);
       }
	   if(ur.filterByEmail("user@gmail.com") == 0) {
		UserModel um = new UserModel();
		um.setEmail("user@gmail.com");
		um.setPassword("123");
		um.setRole("customer");
		um.setUsername("user");
		
		LoginModel lm = new LoginModel();
		lm.setEmail("user@gmail.com");
		lm.setPassword("123");
		
		ur.save(um);
		lr.save(lm);
		}
		if(ur.filterByEmail("test@iamneo.ai") == 0) {
			UserModel um = new UserModel();
			um.setEmail("test@iamneo.ai");
			um.setPassword("neo");
			um.setRole("admin");
			um.setUsername("test");
			
			LoginModel lm = new LoginModel();
			lm.setEmail("test@iamneo.ai");
			lm.setPassword("neo");
			
			ur.save(um);
			lr.save(lm);
		}
    }
}