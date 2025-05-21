package com.lorenzoconsulting.mortgage.infrastructure.persistence.jpa;

import com.lorenzoconsulting.mortgage.infrastructure.persistence.entities.ReportEntity;
import com.lorenzoconsulting.mortgage.infrastructure.persistence.entities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface ReportJPARepository extends JpaRepository<ReportEntity, UUID> {
    Optional<ReportEntity> findById(UUID id);
    List<ReportEntity> findByUserId(String userId);
}
