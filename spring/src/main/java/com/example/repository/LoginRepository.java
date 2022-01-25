package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.LoginModel;

@Repository
public interface LoginRepository extends JpaRepository<LoginModel, Integer>{
	
	@Query(value = "SELECT l.email FROM LoginModel l WHERE l.email=:uemail AND l.password=:upass")
	public String findUser(String uemail, String upass);
}
