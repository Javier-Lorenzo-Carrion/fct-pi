package com.lorenzoconsulting.mortgage.infrastructure.persistence.postgres;

import com.lorenzoconsulting.mortgage.business.domain.Report;
import com.lorenzoconsulting.mortgage.business.domain.ReportRepository;
import com.lorenzoconsulting.mortgage.infrastructure.persistence.entities.ReportEntity;
import com.lorenzoconsulting.mortgage.infrastructure.persistence.jpa.ReportJPARepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class PostgreReportRepository implements ReportRepository {

    private final ReportJPARepository reportJPARepository;

    public PostgreReportRepository(ReportJPARepository reportJPARepository) {
        this.reportJPARepository = reportJPARepository;
    }

    @Override
    public void save(Report report) {
        reportJPARepository.save(ReportEntity.fromReport(report));
    }

    @Override
    public Optional<Report> findById(String id) {
        return reportJPARepository.findById(UUID.fromString(id)).map(ReportEntity::toReport);
    }

    @Override
    public List<Report> findByUserId(String userId) {
        return reportJPARepository.findByUserId(userId).stream().map(ReportEntity::toReport).toList();
    }
}
