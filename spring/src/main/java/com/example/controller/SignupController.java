package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.CartModel;
import com.example.model.LoginModel;
import com.example.model.UserModel;
import com.example.repository.LoginRepository;
import com.example.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class SignupController {
	@Autowired
	private UserRepository userrepository;
	@Autowired
	private LoginRepository loginrepository;
	
	// saveUser(UserModel user){} ............. /signup ...... POST
	@PostMapping("/signup")
	public boolean saveUser(@RequestBody UserModel user) {
		user.setActive(true); 
		user.setCart(new CartModel());
		if(user.getRole() == null){
			user.setRole("customer");
		}
		if(userrepository.filterByEmail(user.getEmail()) == 0) {
			userrepository.save(user);
			
			LoginModel lm = new LoginModel();
			lm.setEmail(user.getEmail());
			lm.setPassword(user.getPassword());
			
			loginrepository.save(lm);
			return true;
		}else {
			return false;
		}

	}
	
	// adding admin user
	@PostMapping("/signup/{token}")
	public boolean saveUser(@RequestBody UserModel user, @PathVariable("token") final String token) {
		user.setActive(true);
		if(token.equals("maihihunadmin@pro")) {
			user.setRole("admin");
		}else {
			user.setRole("customer");
		}
		if(userrepository.filterByEmail(user.getEmail()) == 0) {
			userrepository.save(user);
			
			LoginModel lm = new LoginModel();
			lm.setEmail(user.getEmail());
			lm.setPassword(user.getPassword());
			
			loginrepository.save(lm);
			return true;
		}else {
			return false;
		}

	}
}

  