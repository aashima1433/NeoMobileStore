package com.example.controller;

import java.util.List;
import java.util.Optional;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.ProductModel;
import com.example.repository.ProductRepository;
import com.example.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class ProductController {

	@Autowired
	private ProductRepository productrepository;
	@Autowired
	private UserRepository userrepository;
	
	// List<ProductModel> getHomeProduct(){} .......... /home ......................... GET
	@GetMapping("/home")
	public List<ProductModel> getHomeProduct(){
		return productrepository.findAll();
	}
	
	// List<ProductModel> getProduct(){} .............. /admin ........................ GET
	@GetMapping("/admin")
	public List<ProductModel> getProduct(HttpSession session){
		return productrepository.findAll();
	}
	
	// ProductModel prouctEditData(String id){} ....... /admin/productEdit/{id} ...... GET
	@GetMapping("/admin/productEdit/{id}")
	public Optional<ProductModel> productEditData(@PathVariable("id") final String id, HttpSession session) {
		// System.out.println(id);
		// if(userrepository.getUserRole((String)session.getAttribute("loggedUser")).equals("admin")) {
			return productrepository.findById(id); 
		// }
		// return null;
		// return userrepository.getUserRole((String)session.getAttribute("loggedUser"));
	}
	
	// productEditSave(ProductModel data){} ........... /admin/productEdit/{id} ...... POST
	@PostMapping("/admin/productEdit/{id}")
	public String productEditSave(@PathVariable("id") final String id, @RequestBody ProductModel product, HttpSession session) {
		if(id != null && productrepository.checkProductId(id) != 0) {
			if(productrepository.isProductExist(product.getProductName()) == 0 || productrepository.findProductById(id).getProductName().equals(product.getProductName())) {
				product.setId(id);
				product.setProductId(id);
				productrepository.save(product);
				return "Save the Changes";
			}
//				return "error,Product with changed name already exist";
			return null;
		}
//			return "error,Product Not Available";
		return null;
	}
	
	// productSave(ProductModel data){} ............... /admin/addProduct ............ POST
	@PostMapping("/admin/addProduct")
	public String productSave(@RequestBody ProductModel data) {
			if(productrepository.isProductExist(data.getProductName()) == 0) {
				productrepository.save(data);
				return "Product added";
			}
//			return "error,Product with same name already exists";
			return null;
	}
	
	// productDelete(String id){} ..................... /admin/delete/{id} .......... GET
	@GetMapping("/admin/delete/{id}")
	public String productDelete(@PathVariable("id") final String id, HttpSession session) {
		productrepository.deleteById(id);
		return "Product deleted";
	}
}