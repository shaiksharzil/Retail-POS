package com.retail.backend.product.dto;

public class CreateProductRequest {

    private String name;
    private String barcode;
    private Double price;
    private Integer stockQuantity;
    private String category;

    public CreateProductRequest() {
    }

    public String getName() {
        return name;
    }

    public String getBarcode() {
        return barcode;
    }

    public Double getPrice() {
        return price;
    }

    public Integer getStockQuantity() {
        return stockQuantity;
    }

    public String getCategory() {
        return category;
    }
}