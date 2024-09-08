package com.NinjaCourier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.NinjaCourier.model.Admin;
import com.NinjaCourier.model.Order;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    // Change the method name to match the property name in the Order entity
    Order findByTrackingID(String trackingID);
    
    List<Order> findByAgentId(int agentId);
}