package com.lorenzoconsulting.mortgage.infrastructure.rest.report;

import com.lorenzoconsulting.mortgage.business.domain.CreatableReportFields;

public class CreateReportRequest {

    private String currency;
    private double fundedCapital;
    private double nominalInterestRate;
    private int amortizationPeriod;
    private String amortizationSystem;

    public CreateReportRequest(String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem) {
        this.currency = currency;
        this.fundedCapital = fundedCapital;
        this.nominalInterestRate = nominalInterestRate;
        this.amortizationPeriod = amortizationPeriod;
        this.amortizationSystem = amortizationSystem;
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

    public CreatableReportFields toFields() {
        return new CreatableReportFields(currency, fundedCapital, nominalInterestRate, amortizationPeriod, amortizationSystem);
    }

}

