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
    private final UserRepository userRepository;

    public ReportService(ReportRepository reportRepository, PdfGeneratorPort pdfGeneratorPort, UserRepository userRepository) {
        this.reportRepository = reportRepository;
        this.pdfGeneratorPort = pdfGeneratorPort;
        this.userRepository = userRepository;
    }

    public Report create (String email, CreatableReportFields fields) {
        User foundUser = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email " + email + "¨not found"));
        Report reportToCreate = Report.create(foundUser.getId(), fields);
        reportRepository.save(reportToCreate);
        return reportToCreate;
    }

    public List<Report> findBy(String email) {
        User foundUser = userRepository.findByEmail(email).orElseThrow(() -> new UserNotFoundException("User with email " + email + "¨not found"));
        return reportRepository.findByUserId(foundUser.getId());
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

// TODO: CUIDADO QUE PARECE QUE HAY UNA VULNERABILIDAD EN LA DEPENDENCIA DE BOXABLE