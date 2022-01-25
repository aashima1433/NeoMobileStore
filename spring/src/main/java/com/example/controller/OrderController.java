package com.example.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.OrderModel;
import com.example.model.UserModel;
import com.example.repository.OrderRepository;
import com.example.repository.UserRepository;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class OrderController {
	@Autowired
	private UserRepository userrepository;
	@Autowired
	private OrderRepository orderrepository;
	// List<OrderTemp> getUserProducts(String id){} ...... /orders.......... POST
	@GetMapping("/orders")
	public List<OrderModel> getProductByUserId(HttpSession session){
		if((String)session.getAttribute("loggedUser") != null) {
			String id = (String)session.getAttribute("loggedUser");
			return this.getUserProducts(id);
		}
		return null;
	}
	@PostMapping("/orders")
	public List<OrderModel> getProductByUser(@RequestBody Map<String, String> obj){
		return this.getUserProducts(obj.get("id"));
	}
	
	public List<OrderModel> getUserProducts(String id) {
		return userrepository.getUserEntity(id).getOrderList();
	}
	
	// saveProduct(String id){} .......................... /saveOrder ...... POST
	@PostMapping("/saveOrder")
	public String saveProduct(@RequestBody Map<String, String> obj) {
		if(userrepository.getUserEntity(obj.get("id")).getCart() != null) {
			UserModel um = userrepository.getUserEntity(obj.get("id"));
		
			while(!um.getCart().getCartitems().isEmpty()){
				OrderModel order = new OrderModel();
				order.setUserId(um.getEmail());
				order.setProductName(um.getCart().getCartitems().get(0).getProductName());
				order.setTotalPrice((Integer.parseInt(um.getCart().getCartitems().get(0).getPrice()) * um.getCart().getCartitems().get(0).getQuantity()) + "");
				order.setPrice(um.getCart().getCartitems().get(0).getPrice());
				order.setStatus("purchased");
				order.setQuantity(um.getCart().getCartitems().get(0).getQuantity());
				um.getOrderList().add(order);
				um.getCart().getCartitems().remove(0);
			}

			userrepository.save(um);
			return "Cart items to the Orders list";
		}
		return null;
	}
	// placeOrder(OrderModel order){} .................... /placeOrder ..... POST
	@PostMapping("/placeOrder")
	public String placeOrder(@RequestBody OrderModel order, HttpSession session) {
			UserModel um = userrepository.getUserEntity(order.getUserId());
			order.setStatus("purchased");
			order.setTotalPrice((Integer.parseInt(order.getPrice()) * order.getQuantity()) + "");
			
			um.getOrderList().add(order);	
			userrepository.save(um);
			return "Place items to orders directly";
	}
	
	// List<OrderModel> getAllOrders() ................... /admin/orders ... GET
	@GetMapping("/admin/orders")
	public List<OrderModel> getAllOrders(HttpSession session){
		return orderrepository.findAll();
	}
}
