package com.lorenzoconsulting.mortgage.infrastructure.pdf;

import com.lorenzoconsulting.mortgage.business.domain.Report;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class PdfReportGenerator {
    public static byte[] generate(Report report) throws IOException {
        try (PDDocument document = new PDDocument();
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDPageContentStream contentStream = new PDPageContentStream(document, page);

            contentStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
            contentStream.beginText();
            contentStream.newLineAtOffset(50, 750);
            contentStream.showText("Loan Report");
            contentStream.endText();

            contentStream.setFont(PDType1Font.HELVETICA, 12);
            float yPosition = 720;
            float lineHeight = 20;

            String[] lines = {
                    "Report ID: " + report.getId(),
                    "Currency: " + report.getCurrency(),
                    "Funded Capital: " + report.getFundedCapital(),
                    "Nominal Interest Rate: " + report.getNominalInterestRate(),
                    "Amortization Period: " + report.getAmortizationPeriod(),
                    "Amortization System: " + report.getAmortizationSystem(),
                    "Monthly Loan Payment: " + report.getMonthlyLoanPayment(),
                    "Total Loan Payment: " + report.getTotalLoanPayment(),
                    "Total Interest Payment: " + report.getTotalInterestPayment(),
                    "Relative Interest Charge: " + report.getRelativeInterestCharge()
            };

            for (String line : lines) {
                contentStream.beginText();
                contentStream.newLineAtOffset(50, yPosition);
                contentStream.showText(line);
                contentStream.endText();
                yPosition -= lineHeight;
            }

            contentStream.close();
            document.save(out);
            return out.toByteArray();
        }
    }

}
