package com.lorenzoconsulting.mortgage.business.domain;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

public class UserTest {

    @Test
    void createUser_WithValidFields_ShouldCreateUserSuccessfully() {
        CreatableUserFields fields = new CreatableUserFields(
                "Lorenzo",
                "Consulting",
                "25/05/1990",
                "lorenzo@example.com",
                "securePassword123"
        );

        User user = User.create(fields);

        assertNotNull(user.getId());
        assertEquals("Lorenzo", user.getName());
        assertEquals("Consulting", user.getLastName());
        assertEquals("25/05/1990", user.getBirthDate());
        assertEquals("lorenzo@example.com", user.getEmail());
        assertEquals("securePassword123", user.getPassword());
    }

    @Test
    void createUser_WithInvalidDateFormat_ShouldThrowException() {
        CreatableUserFields fields = new CreatableUserFields(
                "Ana",
                "García",
                "1990-05-25",
                "ana@example.com",
                "password"
        );

        InvalidUserException exception = assertThrows(InvalidUserException.class, () -> {
            User.create(fields);
        });

        assertEquals("Birth date must have a valid format like \"dd/MM/yyyy\"", exception.getMessage());
    }

    @Test
    void createUser_WithInvalidEmailFormat_ShouldThrowException() {
        CreatableUserFields fields = new CreatableUserFields(
                "Carlos",
                "Pérez",
                "25/05/1990",
                "invalid-email",
                "password"
        );

        InvalidUserException exception = assertThrows(InvalidUserException.class, () -> {
            User.create(fields);
        });

        assertEquals("Email must have a valid format like \"john.doe@example.org\"", exception.getMessage());
    }

    @Test
    void createUser_WithEmptyEmail_ShouldThrowException() {
        CreatableUserFields fields = new CreatableUserFields(
                "Lucía",
                "Martínez",
                "25/05/1990",
                "",
                "password"
        );

        assertThrows(InvalidUserException.class, () -> {
            User.create(fields);
        });
    }

    @Test
    void createUser_WithEmptyDate_ShouldThrowException() {
        CreatableUserFields fields = new CreatableUserFields(
                "Pablo",
                "Ruiz",
                "",
                "pablo@example.com",
                "password"
        );

        assertThrows(InvalidUserException.class, () -> {
            User.create(fields);
        });
    }

}
