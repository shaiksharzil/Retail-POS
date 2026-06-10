package com.retail.backend.inventory.controller;

import com.retail.backend.inventory.dto.StockUpdateRequest;
import com.retail.backend.inventory.service.InventoryService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.retail.backend.inventory.entity.InventoryTransaction;
@RestController
@RequestMapping("/api/inventory")
@CrossOrigin(origins = "*")
public class InventoryController {

    private final InventoryService inventoryService;

    public InventoryController(
            InventoryService inventoryService
    ) {
        this.inventoryService = inventoryService;
    }

    @PostMapping("/stock-in")
    public String stockIn(
            @RequestBody StockUpdateRequest request
    ) {

        inventoryService.stockIn(request);

        return "Stock updated";
    }
    @PostMapping("/stock-out")
    public String stockOut(
            @RequestBody StockUpdateRequest request
    ) {

        inventoryService.stockOut(request);

        return "Stock deducted";
    }
    @GetMapping("/transactions")
    public List<InventoryTransaction>
    transactions() {

        return inventoryService
                .getTransactions();
    }
}