package com.retail.backend.reports.controller;

import com.retail.backend.reports.dto.ReportResponse;
import com.retail.backend.reports.service.ReportsService;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/reports")
public class ReportsController {

    private final ReportsService reportsService;

    public ReportsController(
            ReportsService reportsService
    ) {
        this.reportsService =
                reportsService;
    }

    @GetMapping
    public ReportResponse getReport() {

        return reportsService.getReport();
    }
    @GetMapping("/filter")
    public ReportResponse getFilteredReport(

            @RequestParam String from,

            @RequestParam String to

    ) {

        return reportsService.getFilteredReport(
                        from,
                        to
                );
    }
}