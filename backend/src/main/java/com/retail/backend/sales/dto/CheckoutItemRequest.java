package com.retail.backend.sales.dto;

public class CheckoutItemRequest {

    private Long productId;
    private Integer quantity;

    public CheckoutItemRequest() {}

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }
}