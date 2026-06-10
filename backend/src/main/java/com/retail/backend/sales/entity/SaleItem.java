package com.retail.backend.sales.entity;

import com.retail.backend.product.entity.Product;
import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonBackReference;

@Entity
@Table(name = "sale_items")
public class SaleItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @JsonBackReference
    @ManyToOne
    private Sale sale;

    @ManyToOne
    private Product product;

    private Integer quantity;

    private Double unitPrice;

    private Double subtotal;

    public Long getId() {
        return id;
    }

    public Sale getSale() {
        return sale;
    }

    public void setSale(
            Sale sale
    ) {
        this.sale = sale;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(
            Product product
    ) {
        this.product = product;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(
            Integer quantity
    ) {
        this.quantity = quantity;
    }

    public Double getUnitPrice() {
        return unitPrice;
    }

    public void setUnitPrice(
            Double unitPrice
    ) {
        this.unitPrice = unitPrice;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(
            Double subtotal
    ) {
        this.subtotal = subtotal;
    }
}