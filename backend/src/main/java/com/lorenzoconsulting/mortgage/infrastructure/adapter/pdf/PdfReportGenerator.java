package com.lorenzoconsulting.mortgage.infrastructure.adapter.pdf;

import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.domain.Installment;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Component
public class PdfReportGenerator implements PdfGeneratorPort {

    private static final int MAX_ROWS_PER_PAGE = 40;
    private static final float START_Y = 750;
    private static final float LINE_HEIGHT = 14f;
    private static final float START_X = 50;

    public byte[] generate(Report report) throws IOException {
        try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            // Página de resumen
            PDPage summaryPage = new PDPage(PDRectangle.A4);
            document.addPage(summaryPage);
            PDPageContentStream summaryContent = new PDPageContentStream(document, summaryPage);
            summaryContent.setFont(PDType1Font.HELVETICA_BOLD, 12);
            summaryContent.beginText();
            summaryContent.setLeading(16f);
            summaryContent.newLineAtOffset(100, 700);
            summaryContent.showText("Report ID: " + report.getId()); summaryContent.newLine();
            summaryContent.showText("Currency: " + report.getCurrency()); summaryContent.newLine();
            summaryContent.showText("Funded Capital: " + report.getFundedCapital()); summaryContent.newLine();
            summaryContent.showText("Nominal Interest Rate: " + report.getNominalInterestRate() + "%"); summaryContent.newLine();
            summaryContent.showText("Amortization Period (years): " + report.getAmortizationPeriod()); summaryContent.newLine();
            summaryContent.showText("Amortization System: " + report.getAmortizationSystem()); summaryContent.newLine();
            summaryContent.showText("Monthly Loan Payment: " + report.getMonthlyLoanPayment()); summaryContent.newLine();
            summaryContent.showText("Total Loan Payment: " + report.getTotalLoanPayment()); summaryContent.newLine();
            summaryContent.showText("Total Interest Payment: " + report.getTotalInterestPayment()); summaryContent.newLine();
            summaryContent.showText("Relative Interest Charge: " + report.getRelativeInterestCharge()); summaryContent.newLine();
            summaryContent.endText();
            summaryContent.close();

            // Tabla de amortización paginada
            List<Installment> installments = report.getAmortizationSchedule();
            int totalRows = installments.size();
            int currentRow = 0;

            while (currentRow < totalRows) {
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);

                PDPageContentStream content = new PDPageContentStream(document, page);
                content.setFont(PDType1Font.HELVETICA, 10);
                content.beginText();
                content.setLeading(LINE_HEIGHT);
                content.newLineAtOffset(START_X, START_Y);

                // Encabezado
                content.showText("Periodo | Cuota | Interés | Amortización | Capital Pendiente");
                content.newLine();

                for (int i = 0; i < MAX_ROWS_PER_PAGE && currentRow < totalRows; i++, currentRow++) {
                    Installment inst = installments.get(currentRow);
                    String line = String.format("%d | %.2f | %.2f | %.2f | %.2f",
                            inst.getPeriod(),
                            inst.getMonthlyPayment(),
                            inst.getInterestPayment(),
                            inst.getAmortizationPayment(),
                            inst.getRemainingCapital());
                    content.showText(line);
                    content.newLine();
                }

                content.endText();
                content.close();
            }

            document.save(out);
            return out.toByteArray();
        }
    }

}
