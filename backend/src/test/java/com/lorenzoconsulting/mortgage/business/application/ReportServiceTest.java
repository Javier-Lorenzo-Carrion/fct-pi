package com.lorenzoconsulting.mortgage.business.application;

import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.application.service.ReportService;
import com.lorenzoconsulting.mortgage.business.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

import java.util.Optional;

public class ReportServiceTest {
    private final ReportRepository mockReportRepository = Mockito.mock(ReportRepository.class);
    private final PdfGeneratorPort mockPdfGeneratorPort = Mockito.mock(PdfGeneratorPort.class);
    private final UserRepository mockUserRepository = Mockito.mock(UserRepository.class);

    @Nested
    @DisplayName("create should")
    class CreateShould {
        @Test
        public void create_a_new_report() {
            // Given
            ReportService reportService = new ReportService(mockReportRepository, mockPdfGeneratorPort, mockUserRepository);
            //Mockito.when(mockUserRepository.findByEmail("¨john.doe@example.com")).thenReturn(Optional.of(User.create()))
            // When
            String currency = "EUR";
            double fundedCapital = 300000;
            double nominalInterestRate = 2.5;
            int amortizationPeriod = 30;
            String amortizatonSystem = "FRENCH";
            CreatableReportFields fields = new CreatableReportFields(currency, fundedCapital, nominalInterestRate, amortizationPeriod, amortizatonSystem);
            String userId = "john.doe@example.com";
            reportService.create(userId, fields);
            // Then
            ArgumentCaptor<Report> reportArgumentCaptor = ArgumentCaptor.forClass(Report.class);
            Mockito.verify(mockReportRepository).save(reportArgumentCaptor.capture());
            Report actual = reportArgumentCaptor.getValue();
            Assertions.assertThat(actual.getId()).isNotBlank();
            // Assertions.assertThat(actual.getUserId()).isNotBlank(); TODO: CUANDO COMIENCES A IMPLEMENTARLO LE QUITAS EL COMENTARIO Y HACES TDD
            Assertions.assertThat(actual.getGenerationDate()).isNotNull();
            Assertions.assertThat(actual.getCurrency()).isEqualTo(currency);
            Assertions.assertThat(actual.getFundedCapital()).isEqualTo(fundedCapital);
            Assertions.assertThat(actual.getNominalInterestRate()).isEqualTo(nominalInterestRate);
            Assertions.assertThat(actual.getAmortizationPeriod()).isEqualTo(amortizationPeriod);
            Assertions.assertThat(actual.getAmortizationSystem()).isEqualTo(amortizatonSystem);
            // Assertions.assertThat(actual.getAmortizationSchedule(); TOOD: COMPRUEBA ESTO PARA SABER COMO PLANTEAR EL TEST
            // TODO: ES QUE REALMENTE TIENES QUE VER LO QUE SE GUARDA O NO SE GUARDA
        }
    }
}
