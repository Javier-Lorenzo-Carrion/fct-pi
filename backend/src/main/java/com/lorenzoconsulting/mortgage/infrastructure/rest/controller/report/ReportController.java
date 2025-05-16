package com.lorenzoconsulting.mortgage.infrastructure.rest.controller.report;

import com.lorenzoconsulting.mortgage.business.application.service.ReportService;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
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
    public ResponseEntity<Report> create(@RequestBody CreateReportRequest createReportRequest, @AuthenticationPrincipal Jwt jwt) {
        String userId = jwt.getSubject();
        Report report = reportService.create(userId, createReportRequest.toFields());
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

    @GetMapping("/{id}/pdf")
    public ResponseEntity<byte[]> getPdfById(@PathVariable String id) {
        try {
            byte[] pdfBytes = reportService.generatePdf(id);
            return ResponseEntity.ok()
                    .header("Content-Disposition", "attachment; filename=report-" + id + ".pdf")
                    .header("Content-Type", "application/pdf")
                    .body(pdfBytes);
        } catch (IOException e) {
            logger.error("Error generating PDF for report " + id, e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

}
