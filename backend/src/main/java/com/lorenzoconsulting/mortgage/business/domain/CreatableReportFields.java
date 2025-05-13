package com.lorenzoconsulting.mortgage.business.domain;

public record CreatableReportFields(String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem) {
}
