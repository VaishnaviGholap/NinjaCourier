package com.NinjaCourier.Controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.CrudRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.NinjaCourier.AddModal.AddOrder;
import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.Agent;
import com.NinjaCourier.model.Customer;
import com.NinjaCourier.model.Order;
import com.NinjaCourier.repository.AgentRepository;
import com.NinjaCourier.repository.CustomerRepository;
import com.NinjaCourier.repository.OrderRepository;
import com.NinjaCourier.service.SendEmailService;

@RestController
@RequestMapping("/api")
public class OrderController 
{
	
	@Autowired
	OrderRepository orderRepository;
	
	@Autowired
	AgentRepository ar;
	
	@Autowired
	CustomerRepository cr;
	
	@Autowired
	private SendEmailService sendEmailService;
	
	Customer customer;
	
	@PostMapping("/Orders")
	public ResponseEntity<String> createOrder(@RequestBody AddOrder add) {
		String oDate = LocalDate.now().toString();
		String dDate = LocalDate.now().plusDays(5).toString();
		String trk = Order.getTrackId();
		Order order = new Order(add.getName(),add.getPhoneNumber(),add.getEmail(),add.getPickup(),add.getDestination(),oDate,dDate,trk,add.getCustomerId(),add.getAgentId());
		orderRepository.save(order);
		Agent agent = ar.getById(order.getAgentId());
		Customer customer = cr.getById(order.getCustomerId());
		
		
		
		try {
			//Receiver 
            sendEmailService.sendOrderEmail(
            		
                order.getEmail(),
                "Dear " + order.getName() + ",\n\n" +
                "Your Courier has been placed by "+customer.getName()+"\n" +
                "Your trackingId is : "+order.getTrackingID()+
                "\nBest regards,\nNinjaCourier Team",
                "Order Place Successful"
            );
            
            //Agent
            sendEmailService.sendOrderEmail(
            		
                    agent.getEmail(),
                    "Dear Agent " + agent.getAgentName() + ",\n\n" +
                    "You have assigned a cuorier by "+customer.getName()+". From "+order.getPickup()+" to "+ order.getDestination()+"\n" +
                    "Your trackingId is : "+order.getTrackingID()+
                    "\nBest regards,\nNinjaCourier Team",
                    "You have recieved a courier order."
                );
            
            //Customer
            sendEmailService.sendOrderEmail(
            		
                    order.getEmail(),
                    "Dear Customer" + customer.getName() + ",\n\n" +
                    "Your Courier has been placed.\n" +
                    "Your trackingId is : "+order.getTrackingID()+
                    "\nBest regards,\nNinjaCourier Team",
                    "Order Place Successful"
                );
        } catch (Exception e) {
            e.printStackTrace(); // Log the exception
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error sending email");
        }
		return ResponseEntity.ok("Order has been placed and email sent");
	}
	
	@GetMapping("/Orders")
	public ResponseEntity<List<Order>> getAllOrders(){
		List<Order> orderList = new ArrayList<>();
		orderRepository.findAll().forEach(orderList::add);
		return ResponseEntity.ok(orderList);
	}
	
	@GetMapping("/Orders/{id}")
	public ResponseEntity<Order> getOrderById(@PathVariable int id){
		Optional<Order> order = orderRepository.findById(id);
		if(order.isPresent()) {
			return new ResponseEntity<Order>(order.get(), HttpStatus.OK);
		}
		else {
			return new ResponseEntity<Order>(HttpStatus.NOT_FOUND);
		}
	}
	
	 @GetMapping("/Orders/getTrack/{trackingId}")
	    public ResponseEntity<Order> getOrderByTrackingId(@PathVariable String trackingId) {
	        Order order = orderRepository.findByTrackingID(trackingId);
	        if (order != null) {
	            return new ResponseEntity<>(order, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	 }
	 
	 @GetMapping("/Orders/agent/{agent}")
	    public ResponseEntity<?> getOrderByAgent(@PathVariable int agent) {
	        List<Order> order = orderRepository.findByAgentId(agent);
	        if (order != null) {
	            return new ResponseEntity<>(order, HttpStatus.OK);
	        } else {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	 }
	
	 
	 @PostMapping("/Orders/{id}")
		public String update(@PathVariable int id,@RequestBody Order order) {
			Optional<Order> odr = orderRepository.findById(id);
			if(odr.isPresent()) {
				Order orderdetails = odr.get();
				orderdetails.setName(order.getName());
				orderdetails.setPhoneNumber(order.getPhoneNumber());
				orderdetails.setEmail(order.getEmail());
				orderdetails.setTrackingID(order.getTrackingID());
				orderdetails.setAgentId(order.getAgentId());
				orderdetails.setCustomerId(order.getCustomerId());
				orderdetails.setdDate(order.getdDate());
				orderdetails.setoDate(order.getoDate());
				orderdetails.setDestination(order.getDestination());
				orderdetails.setPickup(order.getPickup());
				
				orderRepository.save(orderdetails);
				return "Order Data is updated for "+id;
			}
			else {
				return "there exist some problem";
			}
		}
	 
	 @DeleteMapping("/Orders/{id}")
		public String deleteById(@PathVariable int id) {
			orderRepository.deleteById(id);
			return "Order with id= "+id+"is deleted";
		}
}
