package com.lorenzoconsulting.mortgage.business.domain;

public class InvalidUserException extends RuntimeException{
    public InvalidUserException (String message){
        super(message);
    }
}
