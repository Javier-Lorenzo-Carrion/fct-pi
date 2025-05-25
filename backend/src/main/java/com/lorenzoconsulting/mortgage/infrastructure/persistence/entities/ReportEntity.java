package com.lorenzoconsulting.mortgage.infrastructure.persistence.entities;

import com.lorenzoconsulting.mortgage.business.domain.Report;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.UUIDJdbcType;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Entity
@Table(name = "reports")

public class ReportEntity {

    @Id
    @JdbcType(UUIDJdbcType.class)
    private UUID id;
    @Column(name = "user_id")
    private String userId;
    @Column(name = "generation_date")
    private Instant generationDate;
    @Column(name = "currency")
    private String currency;
    @Column(name = "funded_capital")
    private double fundedCapital;
    @Column(name = "nominal_interest_rate")
    private double nominalInterestRate;
    @Column(name = "amortization_period")
    private int amortizationPeriod;
    @Column(name = "amortization_system")
    private String amortizationSystem;
    @Column(name = "monthly_loan_payment")
    private double monthlyLoanPayment;
    @Column(name = "total_loan_payment")
    private double totalLoanPayment;
    @Column(name = "total_interest_payment")
    private double totalInterestPayment;
    @Column(name = "relative_interest_charge")
    private double relativeInterestCharge;

    public ReportEntity(){}

    public ReportEntity(
            UUID id,
            String userId,
            Instant generationDate,
            String currency,
            double fundedCapital,
            double nominalInterestRate,
            int amortizationPeriod,
            String amortizationSystem,
            double monthlyLoanPayment,
            double totalLoanPayment,
            double totalInterestPayment,
            double relativeInterestCharge) {
        this.id = id;
        this.userId = userId;
        this.generationDate = generationDate;
        this.currency = currency;
        this.fundedCapital = fundedCapital;
        this.nominalInterestRate = nominalInterestRate;
        this.amortizationPeriod = amortizationPeriod;
        this.amortizationSystem = amortizationSystem;
        this.monthlyLoanPayment = monthlyLoanPayment;
        this.totalLoanPayment = totalLoanPayment;
        this.totalInterestPayment = totalInterestPayment;
        this.relativeInterestCharge = relativeInterestCharge;
    }

    public UUID getId() {
        return id;
    }

    public static ReportEntity fromReport(Report report) {
        UUID id = report.getId() != null ? UUID.fromString(report.getId()) : UUID.randomUUID();
        return new ReportEntity(
                id,
                report.getUserId(),
                report.getGenerationDate(),
                report.getCurrency(),
                report.getFundedCapital(),
                report.getNominalInterestRate(),
                report.getAmortizationPeriod(),
                report.getAmortizationSystem(),
                report.getMonthlyLoanPayment(),
                report.getTotalLoanPayment(),
                report.getTotalInterestPayment(),
                report.getRelativeInterestCharge());
    }

    public Report toReport() {
        return new Report(
                id.toString(),
                userId,
                generationDate,
                currency,
                fundedCapital,
                nominalInterestRate,
                amortizationPeriod,
                amortizationSystem,
                monthlyLoanPayment,
                totalLoanPayment,
                totalInterestPayment,
                relativeInterestCharge,
                new ArrayList<>());
    }
}
