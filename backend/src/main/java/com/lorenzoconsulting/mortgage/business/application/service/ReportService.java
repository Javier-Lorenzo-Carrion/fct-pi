package com.lorenzoconsulting.mortgage.business.application.service;

import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.domain.*;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;
    private final PdfGeneratorPort pdfGeneratorPort;

    public ReportService(ReportRepository reportRepository, PdfGeneratorPort pdfGeneratorPort) {
        this.reportRepository = reportRepository;
        this.pdfGeneratorPort = pdfGeneratorPort;
    }

    public Report create (CreatableReportFields fields) {
        Report reportToCreate = Report.create(fields);
        reportRepository.save(reportToCreate);
        return reportToCreate;
    }

    public List<Report> findAll() {
        return reportRepository.findAll();
    }

    public Report get(String id) {
        return reportRepository.findById(id).orElseThrow(() -> new ReportNotFoundException("Report with id '" + id + "' not found."));
    }

    public byte[] generatePdf(String reportId) throws IOException {
        Report report = get(reportId);
        report.recalculateAmortizationSchedule();
        return pdfGeneratorPort.generate(report);
    }

}
