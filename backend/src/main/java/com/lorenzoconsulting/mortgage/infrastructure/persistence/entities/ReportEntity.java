package com.lorenzoconsulting.mortgage.infrastructure.persistence.entities;

import com.lorenzoconsulting.mortgage.business.domain.Report;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.hibernate.annotations.JdbcType;
import org.hibernate.type.descriptor.jdbc.UUIDJdbcType;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.UUID;

@Entity
@Table(name = "reports")

public class ReportEntity {

    @Id
    @JdbcType(UUIDJdbcType.class)
    private UUID id;
    @Column(name = "generationDate")
    private LocalDateTime generationDate;
    @Column(name = "currency")
    private String currency;
    @Column(name = "fundedCapital")
    private double fundedCapital;
    @Column(name = "nominalInterestRate")
    private double nominalInterestRate;
    @Column(name = "amortizationPeriod")
    private int amortizationPeriod;
    @Column(name = "amortizationSystem")
    private String amortizationSystem;
    @Column(name = "monthlyLoanPayment")
    private double monthlyLoanPayment;
    @Column(name = "totalLoanPayment")
    private double totalLoanPayment;
    @Column(name = "totalInterestPayment")
    private double totalInterestPayment;
    @Column(name = "relativeInterestCharge")
    private double relativeInterestCharge;

    public ReportEntity(){}

    public ReportEntity(UUID id, LocalDateTime generationDate,String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem, double monthlyLoanPayment, double totalLoanPayment, double totalInterestPayment, double relativeInterestCharge) {
        this.id = id;
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

    public LocalDateTime getGenerationDate() {
        return generationDate;
    }

    public String getCurrency() {
        return currency;
    }

    public double getFundedCapital() {
        return fundedCapital;
    }

    public double getNominalInterestRate() {
        return nominalInterestRate;
    }

    public int getAmortizationPeriod() {
        return amortizationPeriod;
    }

    public String getAmortizationSystem() {
        return amortizationSystem;
    }

    public double getMonthlyLoanPayment() {
        return monthlyLoanPayment;
    }

    public double getTotalLoanPayment() {
        return totalLoanPayment;
    }

    public double getTotalInterestPayment() {
        return totalInterestPayment;
    }

    public double getRelativeInterestCharge() {
        return relativeInterestCharge;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public void setFundedCapital(double fundedCapital) {
        this.fundedCapital = fundedCapital;
    }

    public void setNominalInterestRate(double nominalInterestRate) {
        this.nominalInterestRate = nominalInterestRate;
    }

    public void setAmortizationPeriod(int amortizationPeriod) {
        this.amortizationPeriod = amortizationPeriod;
    }

    public void setAmortizationSystem(String amortizationSystem) {
        this.amortizationSystem = amortizationSystem;
    }

    public void setMonthlyLoanPayment(double monthlyLoanPayment) {
        this.monthlyLoanPayment = monthlyLoanPayment;
    }

    public void setTotalLoanPayment(double totalLoanPayment) {
        this.totalLoanPayment = totalLoanPayment;
    }

    public void setTotalInterestPayment(double totalInterestPayment) {
        this.totalInterestPayment = totalInterestPayment;
    }

    public void setRelativeInterestCharge(double relativeInterestCharge) {
        this.relativeInterestCharge = relativeInterestCharge;
    }

    public static ReportEntity fromReport(Report report) {
        UUID id = report.getId() != null ? UUID.fromString(report.getId()) : UUID.randomUUID();
        return new ReportEntity(
                id,
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
        return new Report(id.toString(), generationDate,currency, fundedCapital, nominalInterestRate, amortizationPeriod, amortizationSystem, monthlyLoanPayment, totalLoanPayment, totalInterestPayment, relativeInterestCharge, new ArrayList<>());
    }


}
