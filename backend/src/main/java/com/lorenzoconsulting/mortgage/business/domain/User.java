package com.lorenzoconsulting.mortgage.business.domain;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class User {
    private String id;
    private String name;
    private String lastName;
    private String birthDate;
    private String email;
    private String password;


    public User(String id, String name, String lastName, String birthDate, String email, String password) {
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.birthDate = birthDate;
        this.email = email;
        this.password = password;
    }

    public static User create(CreatableUserFields fields) {
        String id = UUID.randomUUID().toString();
        User user = new User(id, fields.name(), fields.lastName(), fields.birthDate(), fields.email(), fields.password());
        if (!user.isValidDateFormat()) {
            throw new InvalidUserException("Birth date must have a valid format like \"dd/MM/yyyy\"");
        }
        if (!user.isValidEmailFormat()) {
            throw new InvalidUserException("Email must have a valid format like \"john.doe@example.org\"");
        }
        return user;
    }

    private boolean isValidEmailFormat() {
        Pattern emailPattern = Pattern.compile(
                "^([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+" +
                        "|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+" +
                        "|\\x22([^\\x0d\\x22\\x5c\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x22))*\\x40([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+" +
                        "|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d)(\\x2e([^\\x00-\\x20\\x22\\x28\\x29\\x2c\\x2e\\x3a-\\x3c\\x3e\\x40\\x5b-\\x5d\\x7f-\\xff]+" +
                        "|\\x5b([^\\x0d\\x5b-\\x5d\\x80-\\xff]|\\x5c[\\x00-\\x7f])*\\x5d))*$");
        Matcher matcher = emailPattern.matcher(email);
        return matcher.matches();
    }

    private boolean isValidDateFormat() {
        try {
            LocalDate.parse(birthDate, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        } catch (DateTimeParseException e) {
            return false;
        }
        return true;
    }

    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public String getLastName() {
        return lastName;
    }
    public String getBirthDate() {
        return birthDate;
    }
    public String getEmail() {
        return email;
    }
    public String getPassword() {
        return password;
    }

    public void setId(String number) {

    }

    public void setEmail(String mail) {

    }

    public void setPassword(String password) {

    }
}
