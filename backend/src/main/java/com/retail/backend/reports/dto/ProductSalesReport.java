package com.retail.backend.reports.dto;

public class ProductSalesReport {

    private String productName;
    private Long quantitySold;

    public ProductSalesReport(
            String productName,
            Long quantitySold
    ) {
        this.productName = productName;
        this.quantitySold = quantitySold;
    }

    public String getProductName() {
        return productName;
    }

    public Long getQuantitySold() {
        return quantitySold;
    }
}