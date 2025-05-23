package com.lorenzoconsulting.mortgage.business.application.service;

import com.lorenzoconsulting.mortgage.business.domain.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User create(CreatableUserFields fields) {
        userRepository.findByEmail(fields.email()).ifPresent(existingUser -> {
            throw new InvalidUserException(String.format("Email, %s, is already in use", existingUser.getEmail()));
        });

        // Usar la contraseña codificada
        CreatableUserFields fieldsWithEncodedPassword = new CreatableUserFields(
                fields.name(),
                fields.lastName(),
                fields.birthDate(),
                fields.email(),
                passwordEncoder.encode(fields.password())
        );

        User userToCreate = User.create(fieldsWithEncodedPassword);
        userRepository.save(userToCreate);
        return userToCreate;
    }

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public void update(String id, EditableUserFields fields) {
        User userToUpdate = get(id);
        userToUpdate.update(fields);
        userRepository.save(userToUpdate);
    }

    public void delete(String id) {
        User userToDelete = get(id);
        userRepository.delete(userToDelete);
    }

    public User get(String id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFoundException("User with id '" + id + "' not found."));
    }
}
