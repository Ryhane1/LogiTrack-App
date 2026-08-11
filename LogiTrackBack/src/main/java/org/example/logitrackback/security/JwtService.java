package org.example.logitrackback.security;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;


@Service
@RequiredArgsConstructor
public class JwtService {

    private final String secretKey = "mySecretKeymySecretKeymySecretKeymySecretKey";
    private final long expiration = 2592000000L;


    private SecretKey getKey() {
             return Keys.hmacShaKeyFor(secretKey.getBytes());}


    public String generateToken(UserDetails userApp) {

        return Jwts.builder()
                .setSubject(userApp.getUsername())
                .claim("role", userApp.getAuthorities())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(getKey())
                .compact();
    }
    public String extractUsername(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey())
                .build().parseClaimsJws(token)
                .getBody().getSubject();
    }


    public boolean isTokenValid(String token, UserDetails userDetails) {
        try {
            String username = extractUsername(token);
            return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
        } catch (Exception e) {
            return false;
        }
    }

    public Date extractExpiration(String token){
        return Jwts.parserBuilder().setSigningKey(getKey())
                .build().parseClaimsJws(token)
                .getBody().getExpiration();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }






}
































//    public boolean validateToken(String token){
//        try{
//            Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token);
//            return true;
//        } catch (RuntimeException e) {
//            return false;
//        }
//    }
