package com.lorenzoconsulting.mortgage.infrastructure.rest.report;

public record CreateReportRequest(
        String currency,
        double fundedCapital,
        double nominalInterestRate,
        int amortizationPeriod,
        String amortizationSystem
) {
}
