package com.lorenzoconsulting.mortgage.infrastructure.persistence.postgres;

import com.lorenzoconsulting.mortgage.business.domain.User;
import com.lorenzoconsulting.mortgage.business.domain.UserRepository;
import com.lorenzoconsulting.mortgage.infrastructure.persistence.entities.UserEntity;
import com.lorenzoconsulting.mortgage.infrastructure.persistence.jpa.UserJPARepository;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Component
public class PostgreUserRepository implements UserRepository {

    private final UserJPARepository userJPARepository;

    public PostgreUserRepository(UserJPARepository userJPARepository) {
        this.userJPARepository = userJPARepository;
    }

    @Override
    public void save(User user) {
        userJPARepository.save(UserEntity.fromUser(user));

    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userJPARepository.findByEmail(email).map(UserEntity::toUser);
    }

    @Override
    public List<User> findAll() {
        return userJPARepository.findAll().stream().map(UserEntity::toUser).toList();
    }

    @Override
    public Optional<User> findById(String id) {
        return userJPARepository.findById(UUID.fromString(id)).map(UserEntity::toUser);
    }

    public void delete(User user) {
        userJPARepository.delete(UserEntity.fromUser(user));
    }
}

