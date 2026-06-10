package com.retail.backend.sales.repository;

import com.retail.backend.sales.entity.Sale;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.Query;

public interface SaleRepository
        extends JpaRepository<Sale, Long> {
    List<Sale> findAllByOrderByIdDesc();
    @Query("""
SELECT COALESCE(
SUM(s.totalAmount),0)
FROM Sale s
""")
    Double getTotalSales();
    @Query(value = """
SELECT COALESCE(
SUM(total_amount),0)
FROM sales
WHERE DATE(created_at)
=
CURRENT_DATE
""",
            nativeQuery = true)
    Double getTodaySales();
    @Query(value = """
SELECT COALESCE(
SUM(total_amount),0)
FROM sales
WHERE EXTRACT(YEAR FROM created_at)
=
EXTRACT(YEAR FROM CURRENT_DATE)

AND

EXTRACT(MONTH FROM created_at)
=
EXTRACT(MONTH FROM CURRENT_DATE)
""",
            nativeQuery = true)
    Double getMonthlySales();
    @Query(value = """
SELECT COALESCE(
SUM(total_amount),0)
FROM sales
WHERE EXTRACT(YEAR FROM created_at)
=
EXTRACT(YEAR FROM CURRENT_DATE)
""",
            nativeQuery = true)
    Double getYearlySales();
    @Query(value = """
SELECT COALESCE(
SUM(total_amount),0)
FROM sales
WHERE DATE_TRUNC(
'week',
created_at
)
=
DATE_TRUNC(
'week',
CURRENT_DATE
)
""",
            nativeQuery = true)
    Double getWeeklySales();
    @Query(value = """
SELECT
TO_CHAR(created_at,'YYYY-MM'),
SUM(total_amount)
FROM sales
GROUP BY TO_CHAR(created_at,'YYYY-MM')
ORDER BY SUM(total_amount) ASC
LIMIT 1
""", nativeQuery = true)
    List<Object[]> getLowestSaleMonth();
    @Query(value = """
SELECT
EXTRACT(YEAR FROM created_at),
SUM(total_amount)
FROM sales
GROUP BY EXTRACT(YEAR FROM created_at)
ORDER BY SUM(total_amount) ASC
LIMIT 1
""", nativeQuery = true)
    List<Object[]> getLowestSaleYear();
    @Query(value = """
SELECT DATE(created_at),
SUM(total_amount)
FROM sales
GROUP BY DATE(created_at)
ORDER BY SUM(total_amount) DESC
LIMIT 1
""",
            nativeQuery = true)
    List<Object[]> getHighestSaleDay();
    @Query(value = """
SELECT DATE(created_at),
SUM(total_amount)
FROM sales
GROUP BY DATE(created_at)
ORDER BY SUM(total_amount) ASC
LIMIT 1
""",
            nativeQuery = true)
    List<Object[]> getLowestSaleDay();
    @Query(value = """
SELECT
TO_CHAR(created_at,'YYYY-MM'),
SUM(total_amount)
FROM sales
GROUP BY
TO_CHAR(created_at,'YYYY-MM')
ORDER BY SUM(total_amount) DESC
LIMIT 1
""",
            nativeQuery = true)
    List<Object[]> getHighestSaleMonth();
    @Query(value = """
SELECT
EXTRACT(YEAR FROM created_at),
SUM(total_amount)
FROM sales
GROUP BY EXTRACT(YEAR FROM created_at)
ORDER BY SUM(total_amount) DESC
LIMIT 1
""", nativeQuery = true)
    List<Object[]> getHighestSaleYear();
    @Query(value = """
SELECT COALESCE(
    SUM(total_amount),0
)
FROM sales
WHERE DATE(created_at)
BETWEEN :fromDate AND :toDate
""", nativeQuery = true)
    Double getTotalSalesBetween(
            LocalDate fromDate,
            LocalDate toDate
    );
    @Query(value = """
SELECT COUNT(*)
FROM sales
WHERE DATE(created_at)
BETWEEN :fromDate AND :toDate
""", nativeQuery = true)
    Long countOrdersBetween(
            LocalDate fromDate,
            LocalDate toDate
    );
    @Query(value = """
SELECT
DATE(created_at),
SUM(total_amount)
FROM sales
WHERE DATE(created_at)
BETWEEN :fromDate AND :toDate
GROUP BY DATE(created_at)
ORDER BY SUM(total_amount) DESC
LIMIT 1
""", nativeQuery = true)
    List<Object[]> getHighestSaleDayBetween(
            LocalDate fromDate,
            LocalDate toDate
    );
    @Query(value = """
SELECT
DATE(created_at),
SUM(total_amount)
FROM sales
WHERE DATE(created_at)
BETWEEN :fromDate AND :toDate
GROUP BY DATE(created_at)
ORDER BY SUM(total_amount) ASC
LIMIT 1
""", nativeQuery = true)
    List<Object[]> getLowestSaleDayBetween(
            LocalDate fromDate,
            LocalDate toDate
    );
}