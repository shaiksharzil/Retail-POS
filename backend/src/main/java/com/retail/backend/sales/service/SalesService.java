package com.retail.backend.sales.service;

import com.retail.backend.product.entity.Product;
import com.retail.backend.product.repository.ProductRepository;
import com.retail.backend.inventory.entity.InventoryTransaction;
import com.retail.backend.inventory.entity.InventoryTransactionType;
import com.retail.backend.inventory.repository.InventoryTransactionRepository;
import com.retail.backend.sales.dto.CheckoutItemRequest;
import com.retail.backend.sales.dto.CheckoutRequest;
import com.retail.backend.sales.entity.Sale;
import com.retail.backend.sales.entity.SaleItem;
import com.retail.backend.sales.repository.SaleRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SalesService {

    private final SaleRepository saleRepository;
    private final ProductRepository productRepository;
    private final InventoryTransactionRepository inventoryRepository;

    public SalesService(
            SaleRepository saleRepository,
            ProductRepository productRepository,
            InventoryTransactionRepository inventoryRepository
    ) {
        this.saleRepository = saleRepository;
        this.productRepository = productRepository;
        this.inventoryRepository = inventoryRepository;
    }

    public Sale checkout(
            CheckoutRequest request
    ) {

        Sale sale = new Sale();

        List<SaleItem> saleItems =
                new ArrayList<>();

        double total = 0;

        for(CheckoutItemRequest item :
                request.getItems()) {

            Product product =
                    productRepository
                            .findById(
                                    item.getProductId()
                            )
                            .orElseThrow();

            if(product.getStockQuantity()
                    < item.getQuantity()) {

                throw new RuntimeException(
                        "Insufficient stock for "
                                + product.getName()
                );
            }

            product.setStockQuantity(
                    product.getStockQuantity()
                            - item.getQuantity()
            );

            productRepository.save(product);

            SaleItem saleItem =
                    new SaleItem();

            saleItem.setSale(sale);

            saleItem.setProduct(product);

            saleItem.setQuantity(
                    item.getQuantity()
            );

            saleItem.setUnitPrice(
                    product.getPrice()
            );

            saleItem.setSubtotal(
                    product.getPrice()
                            * item.getQuantity()
            );

            total +=
                    saleItem.getSubtotal();

            saleItems.add(saleItem);

            InventoryTransaction tx =
                    new InventoryTransaction();

            tx.setProduct(product);

            tx.setType(
                    InventoryTransactionType.STOCK_OUT
            );

            tx.setQuantity(
                    item.getQuantity()
            );

            tx.setRemarks(
                    "Sale Checkout"
            );

            inventoryRepository.save(tx);
        }

        sale.setTotalAmount(total);

        sale.setItems(saleItems);

        return saleRepository.save(sale);
    }
    public List<Sale> getSales() {

        return saleRepository
                .findAllByOrderByIdDesc();
    }
    public Sale getSale(Long id) {

        return saleRepository
                .findById(id)
                .orElseThrow();
    }
}