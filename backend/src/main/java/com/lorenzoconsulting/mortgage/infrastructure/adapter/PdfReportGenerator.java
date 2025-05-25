package com.lorenzoconsulting.mortgage.infrastructure.adapter;

import be.quodlibet.boxable.BaseTable;
import be.quodlibet.boxable.Cell;
import be.quodlibet.boxable.Row;
import com.lorenzoconsulting.mortgage.business.application.port.out.PdfGeneratorPort;
import com.lorenzoconsulting.mortgage.business.domain.Installment;
import com.lorenzoconsulting.mortgage.business.domain.Report;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.springframework.stereotype.Component;
import java.awt.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.List;
import java.util.Locale;

@Component
public class PdfReportGenerator implements PdfGeneratorPort {

    private static final int MAX_ROWS_PER_PAGE = 30;
    private static final float START_Y = 750;
    private static final float LINE_HEIGHT = 14f;
    private static final float START_X = 50;
    private static final DecimalFormat percentFormat = new DecimalFormat("#0.00%");
    private static NumberFormat currencyFormat = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("es-ES"));

    private void addKeyValueRow(BaseTable table, String key, String value) {
        Row<PDPage> row = table.createRow(12f);
        Cell<PDPage> keyCell = row.createCell(50, key);
        Cell<PDPage> valueCell = row.createCell(50, value);
        keyCell.setFont(PDType1Font.HELVETICA_BOLD);
        valueCell.setFont(PDType1Font.HELVETICA);
    }

    public byte[] generate(Report report) throws IOException {

        String currency = report.getCurrency();
        if (currency.equals("USD")) {
            currencyFormat = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("en-US"));
        } else if (currency.equals("GBP")) {
            currencyFormat = NumberFormat.getCurrencyInstance(Locale.forLanguageTag("en-GB"));
        }

        try (PDDocument document = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {

            PDPage summaryPage = new PDPage(PDRectangle.A4);
            document.addPage(summaryPage);

            try (PDPageContentStream titleStream = new PDPageContentStream(document, summaryPage, PDPageContentStream.AppendMode.OVERWRITE, true)) {
                titleStream.beginText();
                titleStream.setFont(PDType1Font.HELVETICA_BOLD, 18);
                titleStream.newLineAtOffset(170, 770);
                titleStream.showText("Mortgage Loan Report");
                titleStream.endText();
            }

            float margin = 50;
            float yStart = 730;
            float tableWidth = summaryPage.getMediaBox().getWidth() - 2 * margin;
            float bottomMargin = 50;

            BaseTable table = new BaseTable(yStart, yStart, bottomMargin, tableWidth, margin, document, summaryPage, true, true);

            Row<PDPage> headerRow = table.createRow(15f);
            Cell<PDPage> c1 = headerRow.createCell(50, "Description");
            Cell<PDPage> c2 = headerRow.createCell(50, "Value");
            c1.setFont(PDType1Font.HELVETICA_BOLD);
            c2.setFont(PDType1Font.HELVETICA_BOLD);
            c1.setFillColor(Color.LIGHT_GRAY);
            c2.setFillColor(Color.LIGHT_GRAY);

            addKeyValueRow(table, "Currency", report.getCurrency());
            addKeyValueRow(table, "Funded capital", currencyFormat.format(report.getFundedCapital()));
            addKeyValueRow(table, "Nominal interest rate (annual)", String.format("%.2f%%", report.getNominalInterestRate()));
            addKeyValueRow(table, "Amortization Period (annual)", String.valueOf(report.getAmortizationPeriod()));
            addKeyValueRow(table, "Frequency payment", "Monthly");
            addKeyValueRow(table, "Amortization System", report.getAmortizationSystem());
            addKeyValueRow(table, "Total capital payment", currencyFormat.format(report.getTotalLoanPayment()));
            addKeyValueRow(table, "Total interest payment", currencyFormat.format(report.getTotalInterestPayment()));
            addKeyValueRow(table, "Relative interest charge", String.format("%.2f%%", report.getRelativeInterestCharge() * 100));

            table.draw();

            List<Installment> installments = report.getAmortizationSchedule();
            int totalRows = installments.size();
            int currentRow = 0;
            int pageNum = 1;
            int pageCountEstimate = (int) Math.ceil((double) totalRows / MAX_ROWS_PER_PAGE);
            List<PDPage> amortizationPages = new java.util.ArrayList<>();

            while (currentRow < totalRows) {
                PDPage page = new PDPage(PDRectangle.A4);
                document.addPage(page);
                amortizationPages.add(page);

                yStart = START_Y;
                bottomMargin = 50;
                tableWidth = page.getMediaBox().getWidth() - 2 * START_X;

                BaseTable amortTable = new BaseTable(yStart, yStart, bottomMargin, tableWidth, START_X, document, page, true, true);

                Row<PDPage> header = amortTable.createRow(12f);
                String[] headers = {"Period", "Payment", "Interest", "Amortization", "Remaining"};
                for (String h : headers) {
                    Cell<PDPage> cell = header.createCell(20, h);
                    cell.setFont(PDType1Font.HELVETICA_BOLD);
                    cell.setFillColor(Color.LIGHT_GRAY);
                }

                for (int i = 0; i < MAX_ROWS_PER_PAGE && currentRow < totalRows; i++, currentRow++) {
                    Installment inst = installments.get(currentRow);
                    Row<PDPage> row = amortTable.createRow(12f);
                    row.createCell(20, String.valueOf(inst.getPeriod()));
                    row.createCell(20, currencyFormat.format(inst.getMonthlyPayment()));
                    row.createCell(20, currencyFormat.format(inst.getInterestPayment()));
                    row.createCell(20, currencyFormat.format(inst.getAmortizationPayment()));
                    row.createCell(20, currencyFormat.format(inst.getRemainingCapital()));
                }

                amortTable.draw();
            }

            int totalPageCount = document.getNumberOfPages();
            for (int i = 0; i < totalPageCount; i++) {
                PDPage page = document.getPage(i);
                try (PDPageContentStream footer = new PDPageContentStream(document, page, PDPageContentStream.AppendMode.APPEND, true)) {
                    footer.beginText();
                    footer.setFont(PDType1Font.HELVETICA_OBLIQUE, 9);
                    footer.newLineAtOffset(page.getMediaBox().getWidth() - 100, 20);
                    footer.showText(String.format("Page %d of %d", i + 1, totalPageCount));
                    footer.endText();
                }
            }
            document.save(out);
            return out.toByteArray();
        }
    }
}
