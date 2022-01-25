package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.UserModel;

@Repository
public interface UserRepository extends JpaRepository<UserModel, Integer> {
	
	@Query("SELECT COUNT(u.email) FROM UserModel u WHERE u.email=:e")
	public long filterByEmail(String e);
	
	@Query("SELECT u.role FROM UserModel u WHERE u.email=:e")
	public String getUserRole(String e);
	
	@Query("SELECT u FROM UserModel u WHERE u.email=:e")
	public UserModel getUserEntity(String e);

	@Query("SELECT u FROM UserModel u WHERE u.id=:i")
	public UserModel getUserEntityById(Integer i);
	
	
}
