package org.example.logitrackback.DTOs;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.example.logitrackback.enums.RoleUser;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserAppDTO implements Serializable {

    private static final long serialVersionUID = 1L;

    private Long id;
    private String nom;
    private String prenom;
    private String email;
    private RoleUser role;
}
