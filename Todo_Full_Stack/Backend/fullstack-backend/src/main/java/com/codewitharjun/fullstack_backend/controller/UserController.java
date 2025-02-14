package com.codewitharjun.fullstack_backend.controller;

import com.codewitharjun.fullstack_backend.model.User;
import com.codewitharjun.fullstack_backend.repository.UserRepository;
import com.codewitharjun.fullstack_backend.exception.UserNotFoundException;  // import custom exception
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/user")
    User newUser(@RequestBody User newUser){
        return userRepository.save(newUser);
    }

    @GetMapping("/users")
    List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/user/{id}")
    User getUserById(@PathVariable Long id){
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));  // Use custom exception
    }

    @PutMapping("/user/{id}")
    User updateUser(@RequestBody User newUser,@PathVariable Long id){
        return userRepository.findById(id)
                .map(user ->{
                    user.setUsername(newUser.getUsername());
                    user.setName(newUser.getName());
                    user.setEmail(newUser.getEmail());
                    return userRepository.save(user);
                }).orElseThrow(()-> new UserNotFoundException(id));
    }

    @DeleteMapping("/user/{id}")
    void deleteUser(@PathVariable Long id) {
        // Check if the user exists before deleting
        if (!userRepository.existsById(id)) {
            throw new UserNotFoundException(id); // Custom exception if the user doesn't exist
        }
        userRepository.deleteById(id); // Perform the deletion
    }


}
