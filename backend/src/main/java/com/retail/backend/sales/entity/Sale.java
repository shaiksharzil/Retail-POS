package com.retail.backend.sales.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonManagedReference;

@Entity
@Table(name = "sales")
public class Sale {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double totalAmount;

    private LocalDateTime createdAt;


    @OneToMany(
            mappedBy = "sale",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER
    )
    @JsonManagedReference
    private List<SaleItem> items;

    @PrePersist
    public void prePersist() {
        createdAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public Double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(
            Double totalAmount
    ) {
        this.totalAmount = totalAmount;
    }

    public List<SaleItem> getItems() {
        return items;
    }

    public void setItems(
            List<SaleItem> items
    ) {
        this.items = items;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

}