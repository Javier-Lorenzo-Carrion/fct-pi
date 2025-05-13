package com.lorenzoconsulting.mortgage.business.domain;

import java.util.UUID;

public class Report {
    private String id;
    private String currency;
    private double fundedCapital;
    private double nominalInterestRate;
    private int amortizationPeriod;
    private String amortizationSystem;
    private double monthlyLoanPayment;
    private double totalLoanPayment;
    private double totalInterestPayment;
    private double relativeInterestCharge;

    public Report(String id, String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem, double monthlyLoanPayment, double totalLoanPayment, double totalInterestPayment, double relativeInterestCharge) {
        this.id = id;
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

    public static Report create(CreatableReportFields fields) {

        String id = UUID.randomUUID().toString();
        int numberOfPaymentsByYear = 12;
        double monthlyNominalRate = fields.nominalInterestRate() / numberOfPaymentsByYear;
        int monthsAmortizationPeriod = fields.amortizationPeriod() * numberOfPaymentsByYear;
        final double monthlyLoanPayment = fields.fundedCapital() * (monthlyNominalRate / (1 - Math.pow((1 + monthlyNominalRate), monthsAmortizationPeriod)));
        double totalLoanPayment = monthlyLoanPayment * monthsAmortizationPeriod;
        double totalInterestPayment = totalLoanPayment - fields.fundedCapital();
        double totalAmortizationPayment = totalLoanPayment - totalInterestPayment;
        double relativeInterestRate = totalInterestPayment / fields.fundedCapital();

        int currentPeriod = 0;
        double currentInterestFee = 0;
        double currentAmortizationFee = 0;
        double currentAmortizedCapital = 0;
        double currentRemainingCapital = fields.fundedCapital();

        for (int i = 0; i < monthsAmortizationPeriod; i++) {
            currentPeriod = currentPeriod + 1;
            currentInterestFee = currentRemainingCapital * monthlyNominalRate;
            currentAmortizationFee = monthlyLoanPayment - currentInterestFee;
            currentRemainingCapital = currentRemainingCapital - currentAmortizationFee;
            currentAmortizedCapital = currentAmortizedCapital + currentAmortizationFee;
            System.out.println(currentPeriod + monthlyLoanPayment + currentInterestFee + currentAmortizationFee + currentAmortizedCapital + currentRemainingCapital);
        }

        System.out.println(monthlyLoanPayment + totalLoanPayment +  totalAmortizationPayment + totalInterestPayment + relativeInterestRate + monthsAmortizationPeriod + fields.currency() + fields.fundedCapital() + fields.amortizationSystem() + fields.nominalInterestRate());

        Report report = new Report(
                id,
                fields.currency(),
                fields.fundedCapital(),
                fields.nominalInterestRate(),
                fields.amortizationPeriod(),
                fields.amortizationSystem(),
                monthlyLoanPayment,
                totalLoanPayment,
                totalInterestPayment,
                relativeInterestRate
                );
        return report;
    }

    public String getId() {
        return id;
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
}
