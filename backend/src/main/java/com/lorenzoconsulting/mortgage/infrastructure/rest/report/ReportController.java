package com.lorenzoconsulting.mortgage.infrastructure.rest.report;

import com.lorenzoconsulting.mortgage.business.application.UserService;
import com.lorenzoconsulting.mortgage.business.domain.User;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.CreateUserRequest;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.UpdateUserRequest;
import com.lorenzoconsulting.mortgage.infrastructure.rest.user.UserResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {
    public ReportController(UserService userService) {
    }

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @PostMapping
    public ResponseEntity<Void> create(@RequestBody CreateReportRequest createReportRequest) {
        logger.info("Request: " + createReportRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping
    public ResponseEntity<List<UserResponse>> findAll() {
        return ResponseEntity.ok(List.of());
    }

    // TODO: Crear métodos update, delete y get en el controlador.


}
