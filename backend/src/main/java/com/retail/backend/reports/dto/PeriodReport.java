package com.retail.backend.reports.dto;

public class PeriodReport {

    private String period;
    private Double amount;

    public PeriodReport(
            String period,
            Double amount
    ) {
        this.period = period;
        this.amount = amount;
    }

    public String getPeriod() {
        return period;
    }

    public Double getAmount() {
        return amount;
    }
}