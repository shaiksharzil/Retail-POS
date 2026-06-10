package com.retail.backend.dashboard.dto;

public class DashboardStatsResponse {

    private long totalProducts;
    private long totalStock;
    private long lowStockProducts;
    private double inventoryValue;

    public DashboardStatsResponse(
            long totalProducts,
            long totalStock,
            long lowStockProducts,
            double inventoryValue
    ) {
        this.totalProducts = totalProducts;
        this.totalStock = totalStock;
        this.lowStockProducts = lowStockProducts;
        this.inventoryValue = inventoryValue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public long getTotalStock() {
        return totalStock;
    }

    public long getLowStockProducts() {
        return lowStockProducts;
    }

    public double getInventoryValue() {
        return inventoryValue;
    }
}