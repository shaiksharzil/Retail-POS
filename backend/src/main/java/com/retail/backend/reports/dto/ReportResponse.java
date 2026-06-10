package com.retail.backend.reports.dto;

public class ReportResponse {

    private Double totalSales;
    private Long totalOrders;
    private Double averageOrderValue;

    private ProductSalesReport topSellingProduct;
    private ProductSalesReport lowestSellingProduct;

    private Double todaySales;
    private Double weeklySales;
    private Double monthlySales;
    private Double yearlySales;

    private PeriodReport highestSaleDay;
    private PeriodReport lowestSaleDay;

    private PeriodReport highestSaleMonth;
    private PeriodReport lowestSaleMonth;

    private PeriodReport highestSaleYear;
    private PeriodReport lowestSaleYear;

    public ReportResponse(
            Double totalSales,
            Long totalOrders,
            Double averageOrderValue,
            ProductSalesReport topSellingProduct,
            ProductSalesReport lowestSellingProduct,

            Double todaySales,
            Double weeklySales,
            Double monthlySales,
            Double yearlySales,

            PeriodReport highestSaleDay,
            PeriodReport lowestSaleDay,

            PeriodReport highestSaleMonth,
            PeriodReport lowestSaleMonth,

            PeriodReport highestSaleYear,
            PeriodReport lowestSaleYear
    ) {
        this.totalSales = totalSales;
        this.totalOrders = totalOrders;
        this.averageOrderValue = averageOrderValue;

        this.topSellingProduct = topSellingProduct;
        this.lowestSellingProduct = lowestSellingProduct;

        this.todaySales = todaySales;
        this.weeklySales = weeklySales;
        this.monthlySales = monthlySales;
        this.yearlySales = yearlySales;

        this.highestSaleDay = highestSaleDay;
        this.lowestSaleDay = lowestSaleDay;

        this.highestSaleMonth = highestSaleMonth;
        this.lowestSaleMonth = lowestSaleMonth;

        this.highestSaleYear = highestSaleYear;
        this.lowestSaleYear = lowestSaleYear;
    }

    public Double getTotalSales() {
        return totalSales;
    }

    public Long getTotalOrders() {
        return totalOrders;
    }

    public Double getAverageOrderValue() {
        return averageOrderValue;
    }

    public ProductSalesReport getTopSellingProduct() {
        return topSellingProduct;
    }

    public ProductSalesReport getLowestSellingProduct() {
        return lowestSellingProduct;
    }
    public Double getTodaySales() {
        return todaySales;
    }

    public Double getWeeklySales() {
        return weeklySales;
    }

    public Double getMonthlySales() {
        return monthlySales;
    }

    public Double getYearlySales() {
        return yearlySales;
    }

    public PeriodReport getHighestSaleDay() {
        return highestSaleDay;
    }

    public PeriodReport getLowestSaleDay() {
        return lowestSaleDay;
    }

    public PeriodReport getHighestSaleMonth() {
        return highestSaleMonth;
    }

    public PeriodReport getLowestSaleMonth() {
        return lowestSaleMonth;
    }

    public PeriodReport getHighestSaleYear() {
        return highestSaleYear;
    }

    public PeriodReport getLowestSaleYear() {
        return lowestSaleYear;
    }

}