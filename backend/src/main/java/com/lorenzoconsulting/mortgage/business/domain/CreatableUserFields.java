package com.lorenzoconsulting.mortgage.business.domain;

public record CreatableUserFields(
        String name,
        String lastName,
        String birthDate,
        String email
){}
