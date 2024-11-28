package com.kmp.Aufgabenverwaltung.Auth;

import com.kmp.Aufgabenverwaltung.User.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@CrossOrigin
@Controller
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService customUserDetailsService;
    private final UserRepository userRepository;
    private final JwtUtil jwtUtil;

    public AuthController(
            AuthenticationManager authenticationManager,
            JwtUtil jwtUtil,
            CustomUserDetailsService customUserDetailsService,
            UserRepository userRepository
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
        this.userRepository = userRepository;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginRequestDTO loginReq) {
        try {
            //------------------------------DONT TOUCH ----------------------------------------------
            Authentication authentication =
                    authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginReq.getEmail(), loginReq.getPassword()));
            String email = authentication.getName();
            UserDetails userDetails = customUserDetailsService.loadUserByUsername(email);
            //------------------------------DONT TOUCH END----------------------------------------------

            if (userDetails.getPassword().equals(loginReq.getPassword())) {
                User user = userRepository.findUserByEmail(loginReq.getEmail());
                String token = jwtUtil.createToken(user);

                return ResponseEntity.ok(new LoginResponseDTO(
                        token,
                        user.getFirstName(),
                        user.getLastName()
                ));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password not matching");
            }

        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        } catch (Exception e) {
            System.out.println("IT CRACKS!");
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("");
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterRequestDTO registerReq) {
        if (userRepository.existsByEmail(registerReq.getEmail())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }
        try {
            User user = new User(
                    registerReq.getEmail(),
                    registerReq.getPassword(),
                    registerReq.getFirstName(),
                    registerReq.getLastName()
            );

            try{
                userRepository.save(user);
                return ResponseEntity.ok(new RegisterResponseDTO(true, "account created"));
            } catch (Exception e) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("could not create account");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("could not create account");
        }
    }
}
