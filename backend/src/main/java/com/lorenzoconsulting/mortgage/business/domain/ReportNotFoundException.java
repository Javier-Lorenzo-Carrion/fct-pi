package com.lorenzoconsulting.mortgage.business.domain;

public class ReportNotFoundException extends RuntimeException {
    public ReportNotFoundException(String message) {
        super(message);
    }
}
