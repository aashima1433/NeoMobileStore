package com.example.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.model.ProductModel;

@Repository
public interface ProductRepository extends JpaRepository<ProductModel, String>{
	@Query("SELECT COUNT(p.id) FROM ProductModel p WHERE p.id=:id")
	public Integer checkProductId(String id);
	
	@Query("SELECT COUNT(p.productName) FROM ProductModel p WHERE p.productName=:name")
	public Integer isProductExist(String name);
	
	@Query("SELECT p FROM ProductModel p WHERE p.id=:id")
	public ProductModel findProductById(String id);
}
