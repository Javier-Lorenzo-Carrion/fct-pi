package com.lorenzoconsulting.mortgage.business.domain;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class Report {
    private String id;
    private LocalDateTime generationDate;
    private String currency;
    private double fundedCapital;
    private double nominalInterestRate;
    private int amortizationPeriod;
    private String amortizationSystem;
    private double monthlyLoanPayment;
    private double totalLoanPayment;
    private double totalInterestPayment;
    private double relativeInterestCharge;
    private List<Installment> amortizationSchedule;

    public List<Installment> getAmortizationSchedule() {
        return amortizationSchedule;
    }

    public Report(String id, LocalDateTime generationDate,String currency, double fundedCapital, double nominalInterestRate, int amortizationPeriod, String amortizationSystem, double monthlyLoanPayment, double totalLoanPayment, double totalInterestPayment, double relativeInterestCharge, List<Installment> amortizationSchedule) {
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
        this.amortizationSchedule = amortizationSchedule;
    }

    public static Report create(CreatableReportFields fields) {

        String id = UUID.randomUUID().toString();
        LocalDateTime now = LocalDateTime.now();
        int paymentsPerYear = 12;
        double monthlyRate = (fields.nominalInterestRate() / 100) / paymentsPerYear;
        int months = fields.amortizationPeriod() * paymentsPerYear;

        List<Installment> installments = new ArrayList<>();
        double monthlyLoanPayment = 0;
        double totalLoanPayment = 0;
        double totalInterestPayment = 0;
        double totalAmortizationPayment = 0;
        double relativeInterestCharge = 0;

        int currentPeriod = 0;
        double currentInterestFee = 0;
        double currentAmortizationFee = 0;
        double currentAmortizedCapital = 0;
        double currentRemainingCapital = fields.fundedCapital();

        String amortizationSystem = fields.amortizationSystem();

        switch (amortizationSystem) {
            case "FRENCH" -> {
                monthlyLoanPayment = fields.fundedCapital() * (monthlyRate / (1 - Math.pow(1 + monthlyRate, -months)));
                for (int i = 1; i <= months; i++) {
                    currentPeriod = currentPeriod + 1;
                    currentInterestFee = currentRemainingCapital * monthlyRate;
                    currentAmortizationFee = monthlyLoanPayment - currentInterestFee;
                    currentRemainingCapital = currentRemainingCapital - currentAmortizationFee;
                    currentAmortizedCapital = currentAmortizedCapital + currentAmortizationFee;
                    installments.add(new Installment(currentPeriod, monthlyLoanPayment, currentInterestFee, currentAmortizationFee, currentRemainingCapital));
                    totalLoanPayment = totalLoanPayment + monthlyLoanPayment;
                    totalInterestPayment = totalInterestPayment + currentInterestFee;
                }
            }
            case "GERMAN" -> {
                for (int i = 1; i <= months; i++) {
                    currentPeriod = currentPeriod + 1;
                    currentInterestFee = currentRemainingCapital * monthlyRate;
                    currentAmortizationFee = fields.fundedCapital() / months;
                    monthlyLoanPayment = currentInterestFee + currentAmortizationFee;
                    currentRemainingCapital = currentRemainingCapital - currentAmortizationFee;
                    currentAmortizedCapital = currentAmortizedCapital + currentAmortizationFee;
                    installments.add(new Installment(currentPeriod, monthlyLoanPayment, currentInterestFee, currentAmortizationFee, currentRemainingCapital));
                    totalLoanPayment = totalLoanPayment + monthlyLoanPayment;
                    totalInterestPayment = totalInterestPayment + currentInterestFee;
                }
            }
            case "AMERICAN" -> {
                for (int i = 1; i <= months; i++) {
                    currentPeriod = currentPeriod + 1;
                    currentInterestFee = currentRemainingCapital * monthlyRate;
                    if (i == months){
                        currentAmortizationFee = currentRemainingCapital;
                        monthlyLoanPayment = currentAmortizationFee + currentInterestFee;
                    } else {
                        currentAmortizationFee = 0;
                    }
                    monthlyLoanPayment = currentInterestFee + currentAmortizationFee;
                    currentRemainingCapital = currentRemainingCapital - currentAmortizationFee;
                    currentAmortizedCapital = currentAmortizedCapital + currentAmortizationFee;
                    installments.add(new Installment(currentPeriod, monthlyLoanPayment, currentInterestFee, currentAmortizationFee, currentRemainingCapital));
                    totalLoanPayment = totalLoanPayment + monthlyLoanPayment;
                    totalInterestPayment = totalInterestPayment + currentInterestFee;
                }
            }
            default -> throw new IllegalArgumentException("Unsupported amortization system: " + amortizationSystem);
        }

        relativeInterestCharge = totalInterestPayment / fields.fundedCapital();



        Report report = new Report(
                id,
                now,
                fields.currency(),
                fields.fundedCapital(),
                fields.nominalInterestRate(),
                fields.amortizationPeriod(),
                fields.amortizationSystem(),
                monthlyLoanPayment,
                totalLoanPayment,
                totalInterestPayment,
                relativeInterestCharge,
                installments
                );
        return report;
    }

    public void recalculateAmortizationSchedule() {
        CreatableReportFields fields = new CreatableReportFields(
                this.currency,
                this.fundedCapital,
                this.nominalInterestRate,
                this.amortizationPeriod,
                this.amortizationSystem
        );

        Report temp = Report.create(fields);

        this.amortizationSchedule = temp.amortizationSchedule;
        this.monthlyLoanPayment = temp.monthlyLoanPayment;
        this.totalLoanPayment = temp.totalLoanPayment;
        this.totalInterestPayment = temp.totalInterestPayment;
        this.relativeInterestCharge = temp.relativeInterestCharge;
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

    public LocalDateTime getGenerationDate() {
        return generationDate;
    }
}
