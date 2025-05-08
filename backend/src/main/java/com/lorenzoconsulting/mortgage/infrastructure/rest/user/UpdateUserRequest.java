package com.lorenzoconsulting.mortgage.infrastructure.rest.user;

import com.lorenzoconsulting.mortgage.business.domain.EditableUserFields;

public class UpdateUserRequest {

    private String name;
    private String lastName;
    private String birthDate;
    private String email;

    public UpdateUserRequest(String name, String lastName, String birthDate, String email) {
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public EditableUserFields toFields() {
        return new EditableUserFields(name, lastName, birthDate, email);
    }
}
