package com.example.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.model.CartModel;
import com.example.model.CartTempModel;
import com.example.model.ProductModel;
import com.example.model.UserModel;
import com.example.repository.CartTempRepository;
import com.example.repository.ProductRepository;
import com.example.repository.UserRepository;

class AdminCartList{
	private String userId;
	private String cartId;
	private Integer cartItemCount;
	private List<CartTempModel> cartItems;
	
	public AdminCartList(){

	}
	public AdminCartList(String userId, String cartId, Integer cartItemCount, List<CartTempModel> cartItems) {
		this.userId = userId;
		this.cartId = cartId;
		this.cartItemCount = cartItemCount;
		this.cartItems = cartItems;
	}
	
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getCartId() {
		return cartId;
	}
	public void setCartId(String cartId) {
		this.cartId = cartId;
	}
	public List<CartTempModel> getCartItems() {
		return cartItems;
	}
	public void setCartItems(List<CartTempModel> cartItems) {
		this.cartItems = cartItems;
	}
	public Integer getCartItemCount() {
		return cartItemCount;
	}
	public void setCartItemCount(Integer cartItemCount) {
		this.cartItemCount = cartItemCount;
	}
}

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
public class CartController {
	@Autowired
	private UserRepository userrepository;
	@Autowired
	private ProductRepository productrepository;
	@Autowired
	private CartTempRepository carttemprepository;
	
	// addToCart(String Quantity, String id){} ........... /home/{id} ..... POST
	@PostMapping("/home/{id}")
	public String addToCart(@RequestBody Map<String, String> req, @PathVariable("id") final String id) {
		String user = req.get("user");
		if(productrepository.checkProductId(id) != 0 && (userrepository.getUserEntity(user).getCart() == null || userrepository.getUserEntity(user).getCart().getCartitems().size() < 5)) {
			UserModel um = userrepository.getUserEntity(user);
			ProductModel pm = productrepository.getOne(id);
			CartModel cm;
			
			CartTempModel ctm = new CartTempModel();
			ctm.setCartItemID(id);
			ctm.setQuantity(Integer.parseInt(req.get("Quantity")));
			
			ctm.setProductName(pm.getProductName());
			ctm.setPrice(pm.getPrice());
			
			
			if(um.getCart() == null) {
				cm = new CartModel();
			}else {
				cm = um.getCart();
			}
			
			cm.getCartitems().add(ctm);
			
			um.setCart(cm);
			cm.setUserId(um);
			
			userrepository.save(um);
			return "Item Added to cart";
		}
		return null;
//		return userrepository.getUserEntity(user).getCart().getCartitems().size() + "";
	}
	
	// List<CartTempModel> showCart(String id){} ......... /cart/{id} ..... GET
	@GetMapping("/cart/{id}")
	public List<CartTempModel> showCart(@PathVariable("id") final String id){
		return userrepository.getUserEntity(id).getCart().getCartitems();
	}
	// list all cart
	@GetMapping("/admin/cart")
	public List<AdminCartList> getCartListAll(){
		List<UserModel> um = userrepository.findAll();
		List<AdminCartList> acl = new ArrayList<AdminCartList>();

		while(!um.isEmpty()){
			String uid = "" + um.get(0).getEmail();
			String cit = um.get(0).getCart() != null? um.get(0).getCart().getId() : "Cart not Available";
			Integer cic = um.get(0).getCart() != null ? um.get(0).getCart().getCartitems().size() : 0;
			List<CartTempModel> itemList =  um.get(0).getCart() != null ? um.get(0).getCart().getCartitems() : null;
			acl.add(new AdminCartList(uid, cit, cic, itemList));
			um.remove(0);
		}
		
		return acl;
	}

	// deleteCartItem(String id){} ....................... /cart/delete ... POST
	@PostMapping("/cart/delete")
	public String deleteCartItem(@RequestBody Map<String, String> obj) {
		if(obj.get("id") != null) {
			carttemprepository.deleteById(obj.get("id"));
			return "Cart Deleted";
		}
		
		return null;
	}
}