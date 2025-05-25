package com.lorenzoconsulting.mortgage.infrastructure.rest.controller.error;

import com.lorenzoconsulting.mortgage.business.domain.InvalidUserException;
import com.lorenzoconsulting.mortgage.business.domain.ReportNotFoundException;
import com.lorenzoconsulting.mortgage.business.domain.UserNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ErrorController {

    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @ExceptionHandler(value = {InvalidUserException.class})
    public ResponseEntity<ErrorResponse> handleBadRequestException(RuntimeException exception) {
        return ResponseEntity.badRequest().body(new ErrorResponse(exception.getMessage()));
    }

    @ExceptionHandler(value = {Throwable.class})
    public ResponseEntity<ErrorResponse> handleUnknownException(Throwable throwable) {
        logger.error("Unknown error ocurred", throwable);
        return ResponseEntity.internalServerError().body(new ErrorResponse("Unknown error"));
    }

    @ExceptionHandler(value = {UserNotFoundException.class, ReportNotFoundException.class})
    public ResponseEntity<ErrorResponse> handleNotFoundException(RuntimeException exception) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ErrorResponse(exception.getMessage()));
    }
}
