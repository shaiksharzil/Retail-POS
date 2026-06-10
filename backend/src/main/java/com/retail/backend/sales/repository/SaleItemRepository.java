package com.retail.backend.sales.repository;

import com.retail.backend.reports.dto.ProductSalesReport;
import com.retail.backend.sales.entity.SaleItem;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SaleItemRepository
        extends JpaRepository<SaleItem, Long> {

    @Query("""
        SELECT new com.retail.backend.reports.dto.ProductSalesReport(
            p.name,
            SUM(si.quantity)
        )
        FROM SaleItem si
        JOIN si.product p
        GROUP BY p.id, p.name
        ORDER BY SUM(si.quantity) DESC
    """)
    List<ProductSalesReport> getProductSales();
}