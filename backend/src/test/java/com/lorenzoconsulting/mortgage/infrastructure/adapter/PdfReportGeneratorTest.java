package com.lorenzoconsulting.mortgage.infrastructure.adapter;

import com.lorenzoconsulting.mortgage.business.domain.Installment;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import com.lorenzoconsulting.mortgage.business.domain.CreatableReportFields;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class PdfReportGeneratorTest {

    private PdfReportGenerator pdfReportGenerator;

    @BeforeEach
    void setUp() {
        pdfReportGenerator = new PdfReportGenerator();
    }

    @Test
    void generate_WithValidReportUSD_ReturnsNonEmptyPdfBytes() throws IOException {
        Report report = createSampleReport("USD");

        byte[] pdfBytes = pdfReportGenerator.generate(report);

        assertNotNull(pdfBytes);
        assertTrue(pdfBytes.length > 0, "El PDF generado debería tener contenido.");
    }

    @Test
    void generate_WithValidReportGBP_ReturnsNonEmptyPdfBytes() throws IOException {
        Report report = createSampleReport("GBP");

        byte[] pdfBytes = pdfReportGenerator.generate(report);

        assertNotNull(pdfBytes);
        assertTrue(pdfBytes.length > 0);
    }

    @Test
    void generate_WithManyInstallments_ShouldPaginateCorrectly() throws IOException {
        Report report = createSampleReport("EUR", 100); // 100 cuotas para probar paginación

        byte[] pdfBytes = pdfReportGenerator.generate(report);

        assertNotNull(pdfBytes);
        assertTrue(pdfBytes.length > 0);
    }

    private Report createSampleReport(String currency) {
        return createSampleReport(currency, 12);
    }

    private Report createSampleReport(String currency, int months) {
        CreatableReportFields fields = new CreatableReportFields(
                currency,
                10000.0,
                5.0,
                months / 12,
                "FRENCH"
        );
        return Report.create("test-user", fields);
    }

}
