package com.lorenzoconsulting.mortgage.business.domain;

import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReportRepository {
    void save(Report report);

    Optional<Report> findById(String id);

    List<Report> findByUserId(String userId);
}
