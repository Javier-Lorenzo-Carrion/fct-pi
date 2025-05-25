package com.lorenzoconsulting.mortgage.business.application.service;

import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

public class ReportServiceTest {
    private final ReportRepository mockReportRepository = Mockito.mock(ReportRepository.class);
    private final PdfGeneratorPort mockPdfGeneratorPort = Mockito.mock(PdfGeneratorPort.class);
    private final UserRepository mockUserRepository = Mockito.mock(UserRepository.class);

    @Nested
    @DisplayName("create should")
    class CreateShould {
        @Test
        public void create_a_new_report() {
            ReportService reportService = new ReportService(mockReportRepository, mockPdfGeneratorPort, mockUserRepository);

            String currency = "EUR";
            double fundedCapital = 300000;
            double nominalInterestRate = 2.5;
            int amortizationPeriod = 30;
            String amortizatonSystem = "FRENCH";
            CreatableReportFields fields = new CreatableReportFields(currency, fundedCapital, nominalInterestRate, amortizationPeriod, amortizatonSystem);
            String userId = "john.doe@example.com";

            User dummyUser = new User("user-id", "John", "Doe", "01/01/1980", userId, "password123");
            Mockito.when(mockUserRepository.findByEmail(userId)).thenReturn(java.util.Optional.of(dummyUser));

            reportService.create(userId, fields);

            ArgumentCaptor<Report> reportArgumentCaptor = ArgumentCaptor.forClass(Report.class);
            Mockito.verify(mockReportRepository).save(reportArgumentCaptor.capture());
            Report actual = reportArgumentCaptor.getValue();

            Assertions.assertThat(actual.getId()).isNotBlank();
            Assertions.assertThat(actual.getGenerationDate()).isNotNull();
            Assertions.assertThat(actual.getCurrency()).isEqualTo(currency);
            Assertions.assertThat(actual.getFundedCapital()).isEqualTo(fundedCapital);
            Assertions.assertThat(actual.getNominalInterestRate()).isEqualTo(nominalInterestRate);
            Assertions.assertThat(actual.getAmortizationPeriod()).isEqualTo(amortizationPeriod);
            Assertions.assertThat(actual.getAmortizationSystem()).isEqualTo(amortizatonSystem);
        }
    }
}
