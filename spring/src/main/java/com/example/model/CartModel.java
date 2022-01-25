package com.example.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import org.hibernate.annotations.GenericGenerator;

@Entity
public class CartModel {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	private String id;
	
	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "cart")	
	private UserModel userId;
	
	@OneToMany(cascade = CascadeType.ALL)
	@JoinColumn(name = "cart_fk", referencedColumnName = "id")
	private List<CartTempModel> cartitems = new ArrayList<CartTempModel>();
	
	public CartModel(){
		
	}
	public CartModel(UserModel userId, List<CartTempModel> cartitems) {
		super();
		this.userId = userId;
		this.cartitems = cartitems;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public UserModel getUserId() {
		return userId;
	}

	public void setUserId(UserModel userId) {
		this.userId = userId;
	}

	public List<CartTempModel> getCartitems() {
		return cartitems;
	}

	public void setCartitems(List<CartTempModel> cartitems) {
		this.cartitems = cartitems;
	}
	
	
}

