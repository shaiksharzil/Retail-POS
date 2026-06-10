package com.retail.backend.dashboard.service;

import com.retail.backend.dashboard.dto.DashboardStatsResponse;
import com.retail.backend.product.entity.Product;
import com.retail.backend.product.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    private final ProductRepository productRepository;

    public DashboardService(
            ProductRepository productRepository
    ) {
        this.productRepository = productRepository;
    }

    public DashboardStatsResponse getStats() {

        List<Product> products =
                productRepository.findAll();

        long totalProducts =
                products.size();

        long totalStock = products.stream()
                .mapToLong(Product::getStockQuantity)
                .sum();

        long lowStockProducts =
                products.stream()
                        .filter(p ->
                                p.getStockQuantity() < 10)
                        .count();

        double inventoryValue =
                products.stream()
                        .mapToDouble(
                                p ->
                                        p.getPrice()
                                                * p.getStockQuantity()
                        )
                        .sum();

        return new DashboardStatsResponse(
                totalProducts,
                totalStock,
                lowStockProducts,
                inventoryValue
        );
    }
}