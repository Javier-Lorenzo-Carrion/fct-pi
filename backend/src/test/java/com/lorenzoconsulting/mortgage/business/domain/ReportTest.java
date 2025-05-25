package com.lorenzoconsulting.mortgage.business.domain;

import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


public class ReportTest {

    @Test
    void createReport_WithFrenchSystem_ShouldGenerateCorrectInstallments() {
        CreatableReportFields fields = new CreatableReportFields(
                "USD",
                10000.0,
                12.0,
                1,
                "FRENCH"
        );

        Report report = Report.create("user-123", fields);

        List<Installment> schedule = report.getAmortizationSchedule();

        assertEquals(12, schedule.size());
        assertEquals("USD", report.getCurrency());
        assertEquals("FRENCH", report.getAmortizationSystem());
        assertTrue(report.getMonthlyLoanPayment() > 0);
        assertEquals(0.0, schedule.get(schedule.size() - 1).getRemainingCapital(), 0.01);
    }

    @Test
    void createReport_WithGermanSystem_ShouldGenerateCorrectInstallments() {
        CreatableReportFields fields = new CreatableReportFields(
                "EUR",
                12000.0,
                6.0,
                1,
                "GERMAN"
        );

        Report report = Report.create("user-456", fields);

        List<Installment> schedule = report.getAmortizationSchedule();

        assertEquals(12, schedule.size());
        assertEquals("GERMAN", report.getAmortizationSystem());
        assertEquals(0.0, schedule.get(schedule.size() - 1).getRemainingCapital(), 0.01);
    }

    @Test
    void createReport_WithAmericanSystem_ShouldDeferCapitalToLastPayment() {
        CreatableReportFields fields = new CreatableReportFields(
                "MXN",
                5000.0,
                10.0,
                1,
                "AMERICAN"
        );

        Report report = Report.create("user-789", fields);
        List<Installment> schedule = report.getAmortizationSchedule();

        assertEquals(12, schedule.size());
        for (int i = 0; i < 11; i++) {
            assertEquals(0.0, schedule.get(i).getAmortizationPayment(), 0.01);
        }

        Installment last = schedule.get(11);
        assertTrue(last.getAmortizationPayment() > 0);
        assertEquals(0.0, last.getRemainingCapital(), 0.01);
    }

    @Test
    void createReport_WithInvalidSystem_ShouldThrowException() {
        CreatableReportFields fields = new CreatableReportFields(
                "USD",
                10000.0,
                5.0,
                1,
                "UNSUPPORTED"
        );

        IllegalArgumentException ex = assertThrows(IllegalArgumentException.class, () -> {
            Report.create("user-error", fields);
        });

        assertEquals("Unsupported amortization system: UNSUPPORTED", ex.getMessage());
    }

    @Test
    void recalculateAmortizationSchedule_ShouldRefreshValues() {
        CreatableReportFields fields = new CreatableReportFields(
                "USD",
                10000.0,
                5.0,
                1,
                "FRENCH"
        );

        Report report = Report.create("user-recalc", fields);
        List<Installment> originalSchedule = report.getAmortizationSchedule();

        report.recalculateAmortizationSchedule();

        List<Installment> newSchedule = report.getAmortizationSchedule();

        assertEquals(originalSchedule.size(), newSchedule.size());
        assertEquals("FRENCH", report.getAmortizationSystem());
    }
}
