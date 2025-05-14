package com.lorenzoconsulting.mortgage.business.application.port.out;

import com.lorenzoconsulting.mortgage.business.domain.Report;

import java.io.IOException;

public interface PdfGeneratorPort {
    byte[] generate(Report report) throws IOException;
}
