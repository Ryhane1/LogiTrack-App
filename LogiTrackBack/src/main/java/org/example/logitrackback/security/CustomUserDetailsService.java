package org.example.logitrackback.security;

import lombok.RequiredArgsConstructor;
import org.example.logitrackback.entity.UserApp;
import org.example.logitrackback.repository.UserAppRepository;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final UserAppRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserApp user = userRepository.findUserAppByNom(username);
        if (user == null) {
            throw new UsernameNotFoundException("Utilisateur introuvable");
        }
        List<SimpleGrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + user.getRole().name())
        );

        return org.springframework.security.core.userdetails.User
                .withUsername(user.getNom())
                .password(user.getPassword())
                .authorities( authorities)
                .build();

    }






//    public UserDetails loadUserByEmail(String email) throws UsernameNotFoundException {
//        UserApp user = userRepository.findUserByEmail(email);
//        if (user == null) {
//            throw new UsernameNotFoundException("Utilisateur introuvable");
//        }
//
//
//        return new org.springframework.security.core.userdetails.UserApp
//                (user.getNom(),user.getPassword(),new ArrayList<>());
//    }


}
