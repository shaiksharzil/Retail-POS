package com.retail.backend.dashboard.controller;

import com.retail.backend.dashboard.dto.DashboardStatsResponse;
import com.retail.backend.dashboard.service.DashboardService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    private final DashboardService dashboardService;

    public DashboardController(
            DashboardService dashboardService
    ) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/stats")
    public DashboardStatsResponse stats() {
        return dashboardService.getStats();
    }
}