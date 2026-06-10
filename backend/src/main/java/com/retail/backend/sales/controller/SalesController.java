package com.retail.backend.sales.controller;

import com.retail.backend.reports.dto.ReportResponse;
import com.retail.backend.sales.dto.CheckoutRequest;
import com.retail.backend.sales.entity.Sale;
import com.retail.backend.sales.service.SalesService;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/sales")
@CrossOrigin(origins = "*")
public class SalesController {

    private final SalesService salesService;

    public SalesController(
            SalesService salesService
    ) {
        this.salesService = salesService;
    }

    @PostMapping("/checkout")
    public Sale checkout(
            @RequestBody CheckoutRequest request
    ) {
        return salesService.checkout(
                request
        );
    }
    @GetMapping
    public List<Sale> getSales() {

        return salesService.getSales();
    }
    @GetMapping("/{id}")
    public Sale getSale(
            @PathVariable Long id
    ) {
        return salesService.getSale(id);
    }
}