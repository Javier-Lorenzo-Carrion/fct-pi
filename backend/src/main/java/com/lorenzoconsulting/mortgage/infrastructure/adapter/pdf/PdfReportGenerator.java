package com.lorenzoconsulting.mortgage.infrastructure.adapter.pdf;

import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

@Component
public class PdfReportGenerator implements PdfGeneratorPort {

    public byte[] generate(Report report) throws IOException {
        try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            PDPage page = new PDPage(PDRectangle.A4);
            document.addPage(page);

            PDPageContentStream content = new PDPageContentStream(document, page);
            content.setFont(PDType1Font.HELVETICA_BOLD, 12);
            content.beginText();
            content.newLineAtOffset(100, 700);
            content.showText("Report: " + report.getId());
            content.endText();
            content.close();

            document.save(out);
            return out.toByteArray();
        }
    }

}
