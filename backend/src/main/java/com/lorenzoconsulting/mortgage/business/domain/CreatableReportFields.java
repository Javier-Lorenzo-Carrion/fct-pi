package com.lorenzoconsulting.mortgage.business.domain;

import java.time.LocalDateTime;

public record CreatableReportFields(
        String currency,
        double fundedCapital,
        double nominalInterestRate,
        int amortizationPeriod,
        String amortizationSystem
){}
