package com.lorenzoconsulting.mortgage.business.application.service;

import com.lorenzoconsulting.mortgage.business.domain.*;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.Optional;

class UserServiceTest {
    private final UserRepository mockUserRepository = Mockito.mock(UserRepository.class);
    private final PasswordEncoder mockPasswordEncoder = Mockito.mock(PasswordEncoder.class);

    @Nested
    @DisplayName("create should")
    class CreateShould {
        @Test
        public void create_a_new_user() {
            //Given
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            //When
            CreatableUserFields fields = new CreatableUserFields("Javier", "Lorenzo Carrion", "17/03/1989", "javierlorenzocarrion@gmail.com", "test");
            userService.create(fields);
            //Then
            ArgumentCaptor<User> userArgumentCaptor = ArgumentCaptor.forClass(User.class);
            Mockito.verify(mockUserRepository).save(userArgumentCaptor.capture());
            User actual = userArgumentCaptor.getValue();
            Assertions.assertThat(actual.getId()).isNotBlank();
            Assertions.assertThat(actual.getName()).isEqualTo("Javier");
            Assertions.assertThat(actual.getLastName()).isEqualTo("Lorenzo Carrion");
            Assertions.assertThat(actual.getBirthDate()).isEqualTo("17/03/1989");
            Assertions.assertThat(actual.getEmail()).isEqualTo("javierlorenzocarrion@gmail.com");
        }

        @Test
        public void throw_an_exception_when_format_birthDate_is_not_valid() {
            //Given
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            //When Then
            CreatableUserFields fields = new CreatableUserFields("Javier", "Lorenzo Carrion", "17-03-1989", "javierlorenzocarrion@gmail.com", "test");
            Assertions.assertThatThrownBy(() -> userService.create(fields))
                    .isInstanceOf(InvalidUserException.class)
                    .hasMessage("Birth date must have a valid format like \"dd/MM/yyyy\"");
        }

        @Test
        public void throw_an_exception_when_email_is_not_valid() {
            //Given
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            //When Then
            CreatableUserFields fields = new CreatableUserFields("Javier", "Lorenzo Carrion", "17/03/1989", "javierlorenzocarrion.com", "test");
            Assertions.assertThatThrownBy(() -> userService.create(fields))
                    .isInstanceOf(InvalidUserException.class)
                    .hasMessage("Email must have a valid format like \"john.doe@example.org\"");
        }
    }

    @Nested
    @DisplayName("find all should")
    class FindAllShould {
        @Test
        public void retrieve_all_users() {
            //Given
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            User userJavier = new User("234567654", "Javi", "Lorenzo Carrion", "17/03/1989", "javierlorenzocarrion@gmail.com", "test");
            User userMiguel = new User("234fdvdcfsdvc4", "Miguel", "Lorenzo Carrion", "17/03/1989", "javierlo@gmail.com", "test");
            User userSergio = new User("23456fddvcfd7654", "Sergio", "Lorenzo Carrion", "17/03/1989", "jav@gmail.com", "test");
            Mockito.when(mockUserRepository.findAll()).thenReturn(List.of(userJavier, userMiguel, userSergio));
            //When
            List<User> actual = userService.findAll();
            //Then
            Assertions.assertThat(actual).containsExactly(userJavier, userMiguel, userSergio);
        }
    }

    @Nested
    @DisplayName("get should")
    class GetShould {
        @Test
        public void retrieve_a_user_byId() {
            //Given
            User userToGet = new User("4356789", "Manuel", "Perez Chacon", "10/07/1997", "manuelchacon@gmail.com", "test");
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            Mockito.when(mockUserRepository.findById(userToGet.getId())).thenReturn(Optional.of(userToGet));
            //When
            User userGetted = userService.get(userToGet.getId());
            //Then
            Assertions.assertThat(userGetted).isEqualTo(userToGet);
            Assertions.assertThat(userGetted.getId()).isEqualTo(userToGet.getId());
            Assertions.assertThat(userGetted.getName()).isEqualTo(userToGet.getName());
            Assertions.assertThat(userGetted.getLastName()).isEqualTo(userToGet.getLastName());
            Assertions.assertThat(userGetted.getBirthDate()).isEqualTo(userToGet.getBirthDate());
            Assertions.assertThat(userGetted.getEmail()).isEqualTo(userToGet.getEmail());
        }

        @Test
        public void throw_an_exception_when_user_is_not_found() {
            //Given
            User userToGet = new User("435678", "Benito", "Perdomo Perez", "02/02/1975", "benito@gmail.com", "test");
            UserService userService = new UserService(mockUserRepository, mockPasswordEncoder);
            Mockito.when(mockUserRepository.findById(userToGet.getId())).thenReturn(Optional.empty());
            //When //Then
            Assertions.assertThatThrownBy(() -> userService.get(userToGet.getId()))
                    .isInstanceOf(UserNotFoundException.class)
                    .hasMessage("User with id '" + userToGet.getId() + "' not found.");
        }
    }
}