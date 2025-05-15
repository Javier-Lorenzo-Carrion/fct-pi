package com.lorenzoconsulting.mortgage.business.domain;

public class Installment {

    private final int period;
    private final double monthlyPayment;
    private final double interestPayment;
    private final double amortizationPayment;
    private final double remainingCapital;

    public Installment(int period, double monthlyPayment, double interestPayment, double amortizationPayment, double remainingCapital) {
        this.period = period;
        this.monthlyPayment = monthlyPayment;
        this.interestPayment = interestPayment;
        this.amortizationPayment = amortizationPayment;
        this.remainingCapital = remainingCapital;
    }

    public int getPeriod() {
        return period;
    }

    public double getMonthlyPayment() {
        return monthlyPayment;
    }

    public double getInterestPayment() {
        return interestPayment;
    }

    public double getAmortizationPayment() {
        return amortizationPayment;
    }

    public double getRemainingCapital() {
        return remainingCapital;
    }
}
