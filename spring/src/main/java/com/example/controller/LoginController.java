package com.example.controller;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.LoginModel;
import com.example.repository.LoginRepository;
import com.example.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class LoginController {
	@Autowired
	private LoginRepository loginrepository;
	@Autowired
	private UserRepository userrepository;
	
	// boolean checkUser(LoginModel data){} ................ /login ...... POST
	@PostMapping("/login")
	public boolean checkUser(@RequestBody LoginModel data, HttpSession session) {
		if(loginrepository.findUser(data.getEmail(), data.getPassword()) != null) {
			session.setAttribute("loggedUser", data.getEmail());
			return true;
		}
		return false;
	}

	@GetMapping("/userrole/{email}")
	public boolean getLoggedUserRole(@PathVariable("email") final String email){
		return userrepository.getUserEntity(email).getRole().equals("admin")?true:false;
	}
}
