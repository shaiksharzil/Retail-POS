package com.retail.backend.inventory.service;

import com.retail.backend.inventory.dto.StockUpdateRequest;
import com.retail.backend.inventory.entity.InventoryTransaction;
import com.retail.backend.inventory.entity.InventoryTransactionType;
import com.retail.backend.inventory.repository.InventoryTransactionRepository;
import com.retail.backend.product.entity.Product;
import com.retail.backend.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InventoryService {

    private final ProductRepository productRepository;
    private final InventoryTransactionRepository transactionRepository;

    public InventoryService(
            ProductRepository productRepository,
            InventoryTransactionRepository transactionRepository
    ) {
        this.productRepository = productRepository;
        this.transactionRepository = transactionRepository;
    }

    public void stockIn(
            StockUpdateRequest request
    ) {

        Product product =
                productRepository
                        .findById(request.getProductId())
                        .orElseThrow();

        product.setStockQuantity(
                product.getStockQuantity()
                        + request.getQuantity()
        );

        productRepository.save(product);

        InventoryTransaction tx =
                new InventoryTransaction();

        tx.setProduct(product);

        tx.setType(
                InventoryTransactionType.STOCK_IN
        );

        tx.setQuantity(
                request.getQuantity()
        );

        tx.setRemarks(
                request.getRemarks()
        );

        transactionRepository.save(tx);
    }
    public void stockOut(
            StockUpdateRequest request
    ) {

        Product product =
                productRepository
                        .findById(request.getProductId())
                        .orElseThrow();

        if(product.getStockQuantity()
                < request.getQuantity()) {

            throw new RuntimeException(
                    "Insufficient stock"
            );
        }

        product.setStockQuantity(
                product.getStockQuantity()
                        - request.getQuantity()
        );

        productRepository.save(product);

        InventoryTransaction tx =
                new InventoryTransaction();

        tx.setProduct(product);

        tx.setType(
                InventoryTransactionType.STOCK_OUT
        );

        tx.setQuantity(
                request.getQuantity()
        );

        tx.setRemarks(
                request.getRemarks()
        );

        transactionRepository.save(tx);
    }
    public List<InventoryTransaction>
    getTransactions() {

        return transactionRepository.findAll();
    }
}