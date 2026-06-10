package com.retail.backend.sales.dto;

import java.util.List;

public class CheckoutRequest {

    private List<CheckoutItemRequest> items;

    public CheckoutRequest() {}

    public List<CheckoutItemRequest> getItems() {
        return items;
    }
}