package org.example.logitrackback.auth.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.logitrackback.enums.RoleUser;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserSignUp {
    @NotBlank
    private String nom;
    @NotBlank
    private String prenom;
    @NotBlank
    @Email
    private String email;
    @NotBlank
    @Size(min = 4)
    private String password;
    @NotBlank
    private RoleUser role;




}
