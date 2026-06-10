package com.retail.backend.reports.service;

import com.retail.backend.reports.dto.PeriodReport;
import com.retail.backend.reports.dto.ProductSalesReport;
import com.retail.backend.reports.dto.ReportResponse;
import com.retail.backend.sales.repository.SaleItemRepository;
import com.retail.backend.sales.repository.SaleRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.List;

@Service
public class ReportsService {

    private final SaleRepository saleRepository;
    private final SaleItemRepository saleItemRepository;

    public ReportsService(
            SaleRepository saleRepository,
            SaleItemRepository saleItemRepository
    ) {
        this.saleRepository = saleRepository;
        this.saleItemRepository = saleItemRepository;
    }

    private PeriodReport mapPeriodReport(List<Object[]> rows) {

        if (rows == null || rows.isEmpty()) {
            return null;
        }

        Object[] row = rows.get(0);

        return new PeriodReport(
                row[0].toString(),
                ((Number) row[1]).doubleValue()
        );
    }

    public ReportResponse getFilteredReport(
            String from,
            String to
    ) {

        LocalDate fromDate =
                LocalDate.parse(from);

        LocalDate toDate =
                LocalDate.parse(to);

        Double totalSales =
                saleRepository.getTotalSalesBetween(
                        fromDate,
                        toDate
                );

        Long totalOrders =
                saleRepository.countOrdersBetween(
                        fromDate,
                        toDate
                );

        Double averageOrderValue =
                totalOrders == 0
                        ? 0.0
                        : totalSales / totalOrders;

        PeriodReport highestSaleDay =
                mapPeriodReport(
                        saleRepository
                                .getHighestSaleDayBetween(
                                        fromDate,
                                        toDate
                                )
                );

        PeriodReport lowestSaleDay =
                mapPeriodReport(
                        saleRepository
                                .getLowestSaleDayBetween(
                                        fromDate,
                                        toDate
                                )
                );

        return new ReportResponse(
                totalSales,
                totalOrders,
                averageOrderValue,
                null,
                null,
                0.0,
                0.0,
                0.0,
                0.0,
                highestSaleDay,
                lowestSaleDay,
                null,
                null,
                null,
                null
        );
    }

    public ReportResponse getReport() {

        List<ProductSalesReport> productSales =
                saleItemRepository.getProductSales();

        ProductSalesReport topSelling =
                productSales.isEmpty()
                        ? null
                        : productSales.get(0);

        ProductSalesReport lowestSelling =
                productSales.isEmpty()
                        ? null
                        : productSales.get(productSales.size() - 1);

        Double totalSales =
                saleRepository.getTotalSales();

        Long totalOrders =
                saleRepository.count();

        Double averageOrderValue =
                (totalOrders == 0 || totalSales == null)
                        ? 0.0
                        : totalSales / totalOrders;

        Double todaySales =
                saleRepository.getTodaySales();

        Double weeklySales =
                saleRepository.getWeeklySales();

        Double monthlySales =
                saleRepository.getMonthlySales();

        Double yearlySales =
                saleRepository.getYearlySales();

        List<Object[]> highestDay =
                saleRepository.getHighestSaleDay();

        PeriodReport highestSaleDay =
                mapPeriodReport(highestDay);

        List<Object[]> lowestDay =
                saleRepository.getLowestSaleDay();

        PeriodReport lowestSaleDay =
                mapPeriodReport(lowestDay);

        List<Object[]> highestMonth =
                saleRepository.getHighestSaleMonth();

        PeriodReport highestSaleMonth =
                mapPeriodReport(highestMonth);

        List<Object[]> lowestMonth =
                saleRepository.getLowestSaleMonth();

        PeriodReport lowestSaleMonth =
                mapPeriodReport(lowestMonth);

        List<Object[]> highestYear =
                saleRepository.getHighestSaleYear();

        PeriodReport highestSaleYear =
                mapPeriodReport(highestYear);

        List<Object[]> lowestYear =
                saleRepository.getLowestSaleYear();

        PeriodReport lowestSaleYear =
                mapPeriodReport(lowestYear);

        return new ReportResponse(
                totalSales,
                totalOrders,
                averageOrderValue,

                topSelling,
                lowestSelling,

                todaySales,
                weeklySales,
                monthlySales,
                yearlySales,

                highestSaleDay,
                lowestSaleDay,

                highestSaleMonth,
                lowestSaleMonth,

                highestSaleYear,
                lowestSaleYear
        );
    }
}