package com.lorenzoconsulting.mortgage.business.application;

import com.lorenzoconsulting.mortgage.business.domain.CreatableReportFields;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import com.lorenzoconsulting.mortgage.business.domain.ReportNotFoundException;
import com.lorenzoconsulting.mortgage.business.domain.ReportRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportService {

    private final ReportRepository reportRepository;

    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
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

}
