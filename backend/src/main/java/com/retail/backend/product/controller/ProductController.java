package com.retail.backend.product.controller;

import com.retail.backend.product.dto.CreateProductRequest;
import com.retail.backend.product.entity.Product;
import com.retail.backend.product.service.ProductService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.retail.backend.product.dto.UpdateProductRequest;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*")
public class ProductController {

    private final ProductService productService;

    public ProductController(
            ProductService productService
    ) {
        this.productService = productService;
    }

    @PostMapping
    public Product createProduct(
            @RequestBody CreateProductRequest request
    ) {
        return productService.createProduct(request);
    }
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }
    @GetMapping("/{id}")
    public Product getProductById(
            @PathVariable Long id
    ) {
        return productService.getProductById(id);
    }
    @PutMapping("/{id}")
    public Product updateProduct(
            @PathVariable Long id,
            @RequestBody UpdateProductRequest request
    ) {

        return productService.updateProduct(
                id,
                request
        );
    }
    @DeleteMapping("/{id}")
    public String deleteProduct(
            @PathVariable Long id
    ) {

        productService.deleteProduct(id);

        return "Product deleted successfully";
    }
    @GetMapping("/low-stock")
    public List<Product>
    lowStockProducts() {

        return productService
                .getLowStockProducts();
    }
}