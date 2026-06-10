package com.retail.backend.inventory.dto;

public class StockUpdateRequest {

    private Long productId;

    private Integer quantity;

    private String remarks;

    public StockUpdateRequest() {}

    public Long getProductId() {
        return productId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getRemarks() {
        return remarks;
    }
}