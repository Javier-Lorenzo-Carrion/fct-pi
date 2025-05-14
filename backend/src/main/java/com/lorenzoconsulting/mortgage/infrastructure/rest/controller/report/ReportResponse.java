package com.lorenzoconsulting.mortgage.infrastructure.rest.controller.report;

import com.lorenzoconsulting.mortgage.business.domain.Report;

public record ReportResponse(String id, String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem, double monthlyLoanPayment, double totalLoanPayment, double totalInterestPayment, double relativeInterestCharge) {
    public static ReportResponse from(Report report) {
        return new ReportResponse(report.getId(), report.getCurrency(), report.getFundedCapital(), report.getNominalInterestRate(), report.getAmortizationPeriod(), report.getAmortizationSystem(), report.getMonthlyLoanPayment(), report.getTotalLoanPayment(), report.getTotalInterestPayment(), report.getRelativeInterestCharge());
    }
}
