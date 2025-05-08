package com.lorenzoconsulting.mortgage.infrastructure.rest.user;

import com.lorenzoconsulting.mortgage.business.application.UserService;
import com.lorenzoconsulting.mortgage.business.domain.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreateUserRequest createUserRequest) {
        userService.create(createUserRequest.toFields());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        List<User> foundUsers = userService.findAll();
        return ResponseEntity.ok(foundUsers.stream().map(UserResponse::from).toList());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Void> update(@PathVariable String id, @RequestBody UpdateUserRequest updateUserRequest) {
        userService.update(id, updateUserRequest.toFields());
        return ResponseEntity.noContent().build();
    }

    // TODO: Crear métodos update, delete y get en el controlador.


}
