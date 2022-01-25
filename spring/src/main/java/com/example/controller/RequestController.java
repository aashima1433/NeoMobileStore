package com.example.controller;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class RequestController {
	@GetMapping("/")
	public String errorMessage(HttpSession session) {
		return (String)session.getAttribute("loggedUser") == null?"No User Login":"Hello, " + (String)session.getAttribute("loggedUser");
	}
	@GetMapping("/logout")
	public boolean logMeOut(HttpSession session) {
		if (session != null) {
	        session.invalidate();
	        return true;
	    }
		return false;
	}
}
