package com.retail.backend.inventory.repository;

import com.retail.backend.inventory.entity.InventoryTransaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InventoryTransactionRepository
        extends JpaRepository<
        InventoryTransaction,
        Long> {
}