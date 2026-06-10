package com.retail.backend.product.service;

import com.retail.backend.product.dto.CreateProductRequest;
import com.retail.backend.product.entity.Product;
import com.retail.backend.product.repository.ProductRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import com.retail.backend.product.dto.UpdateProductRequest;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(
            ProductRepository productRepository
    ) {
        this.productRepository = productRepository;
    }

    public Product createProduct(
            CreateProductRequest request
    ) {

        Product product = new Product();

        product.setName(request.getName());
        product.setBarcode(request.getBarcode());
        product.setPrice(request.getPrice());
        product.setStockQuantity(
                request.getStockQuantity()
        );
        product.setCategory(
                request.getCategory()
        );

        return productRepository.save(product);
    }
    public List<Product> getAllProducts() {

        return productRepository
                .findByActiveTrue();
    }
    public Product getProductById(Long id) {

        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found"));
    }
    public Product updateProduct(
            Long id,
            UpdateProductRequest request
    ) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"));

        product.setName(request.getName());
        product.setBarcode(request.getBarcode());
        product.setPrice(request.getPrice());
        product.setStockQuantity(
                request.getStockQuantity()
        );
        product.setCategory(
                request.getCategory()
        );

        return productRepository.save(product);
    }
    public void deleteProduct(Long id) {

        Product product =
                productRepository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Product not found"));

        product.setActive(false);

        productRepository.save(product);
    }
    public List<Product>
    getLowStockProducts() {

        return productRepository
                .findByStockQuantityLessThan(10);
    }
}