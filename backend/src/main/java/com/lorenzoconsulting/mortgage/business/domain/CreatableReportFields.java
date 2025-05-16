package com.lorenzoconsulting.mortgage.business.domain;

import java.time.LocalDateTime;

public record CreatableReportFields(
        String currency,
        double fundedCapital,
        double nominalInterestRate,
        int amortizationPeriod,
        String amortizationSystem
        // TODO: ENTIENDO QUE UNA DE LAS COSAS QUE HAY QUE HACER ES PONER MAS CAMPOS AQUI DE LOS QUE QUIERES QUE SE GUARDEN EN REPOSITORY PARA QUE LUEGO PUEDAN MOSTRARSE
){}
