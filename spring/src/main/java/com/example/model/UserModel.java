package com.example.model;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

@Entity
public class UserModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	
	private String username;
	private String email;
	private String password;
	private String mobileNumber;
	
	private boolean active;
	private String role;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "cart_id")
	private CartModel cart;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "userId_fk", referencedColumnName = "id") 
	private List<OrderModel> orderList = new ArrayList<OrderModel>();
	
	public UserModel(){
		
	}
	public UserModel(String username, String email, String password, String mobileNumber, boolean active, String role,
			CartModel cart, List<OrderModel> orderList) {
		this.username = username;
		this.email = email;
		this.password = password;
		this.mobileNumber = mobileNumber;
		this.active = active;
		this.role = role;
		this.cart = cart;
		this.orderList = orderList;
	}
	
	public long getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getMobileNumber() {
		return mobileNumber;
	}
	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	public boolean isActive() {
		return active;
	}
	public void setActive(boolean active) {
		this.active = active;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public CartModel getCart() {
		return cart;
	}
	public void setCart(CartModel cart) {
		this.cart = cart;
	}
	public List<OrderModel> getOrderList() {
		return orderList;
	}
	public void setOrderList(List<OrderModel> orderList) {
		this.orderList = orderList;
	}
}
