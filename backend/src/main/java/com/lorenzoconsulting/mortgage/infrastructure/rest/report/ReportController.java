package com.lorenzoconsulting.mortgage.infrastructure.rest.report;

import com.lorenzoconsulting.mortgage.business.application.ReportService;
import com.lorenzoconsulting.mortgage.business.application.UserService;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import com.lorenzoconsulting.mortgage.business.domain.User;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.CreateUserRequest;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.UpdateUserRequest;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.UserResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping
    public ResponseEntity<Report> create(@RequestBody CreateReportRequest createReportRequest) {
        Report report = reportService.create(createReportRequest.toFields());
        logger.info("Request: " + createReportRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(report);
    }

    @GetMapping
    public ResponseEntity<List<Report>> findAll() {
        return ResponseEntity.ok(reportService.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Report> getById(@PathVariable String id) {
        Report report = reportService.get(id);
        return ResponseEntity.ok(report);
    }
}
