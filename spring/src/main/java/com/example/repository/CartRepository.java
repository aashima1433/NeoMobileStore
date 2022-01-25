package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.CartModel;

@Repository
public interface CartRepository extends JpaRepository<CartModel, String> {
	@Query("SELECT c FROM CartModel c WHERE c.id=:id")
	public CartModel getCartEntity(String id);
}
