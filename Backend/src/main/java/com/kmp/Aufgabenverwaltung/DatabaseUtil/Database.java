package com.kmp.Aufgabenverwaltung.DatabaseUtil;

import com.kmp.Aufgabenverwaltung.User.User;
import com.kmp.Aufgabenverwaltung.User.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class Database {

    private final UserRepository userRepository;

    public Database(
            UserRepository userRepository
    ) {
        this.userRepository = userRepository;
    }

    public boolean checkUserExists(String email) {
        return userRepository.existsByEmail(email);
    }
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }
    public boolean saveUser(User user) {
        try {
            userRepository.save(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
