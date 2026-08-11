package org.example.logitrackback.repository;

import org.example.logitrackback.entity.UserApp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserAppRepository extends JpaRepository<UserApp, Long> {

    UserApp findUserAppByEmail(String email);

    UserApp findUserAppByNom(String nom);

}
