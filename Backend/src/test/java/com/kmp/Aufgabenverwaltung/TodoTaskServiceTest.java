package com.kmp.Aufgabenverwaltung;

import com.kmp.Aufgabenverwaltung.TodoTask.TodoTask;
import com.kmp.Aufgabenverwaltung.TodoTask.TodoTaskDTO;
import com.kmp.Aufgabenverwaltung.TodoTask.TodoTaskRepository;
import com.kmp.Aufgabenverwaltung.TodoTask.TodoTaskService;
import com.kmp.Aufgabenverwaltung.User.User;
import com.kmp.Aufgabenverwaltung.User.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

public class TodoTaskServiceTest {

    @Mock
    private TodoTaskRepository todoTaskRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private TodoTaskService todoTaskService;

    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        user = new User();
        user.setId(1L);
        user.setEmail("test@example.com");
    }

    @Test
    void testCreateTask() {
        // Mocking: Benutzer wird gefunden
        when(userRepository.findUserByEmail("test@example.com")).thenReturn(user);

        TodoTaskDTO todoTaskDTO = new TodoTaskDTO(null, "Test Task", "Test Description", false, 0);

        TodoTask todoTask = new TodoTask("Test Task", "Test Description", false, 0);
        todoTask.setUser(user);
        todoTask.setId(1L);

        // Mocking: Speicherung des Tasks
        when(todoTaskRepository.save(any(TodoTask.class))).thenReturn(todoTask);

        // Test
        TodoTaskDTO result = todoTaskService.createTask("test@example.com", todoTaskDTO);

        // Assertions
        assertEquals(1L, result.getId());
        assertEquals(todoTaskDTO.getTitle(), result.getTitle());
        assertEquals(todoTaskDTO.getDescription(), result.getDescription());
        assertEquals(todoTaskDTO.isCompleted(), result.isCompleted());
        assertEquals(todoTaskDTO.getOrder(), result.getOrder());

        // Verifizierung der Interaktionen
        verify(userRepository, times(1)).findUserByEmail("test@example.com");
        verify(todoTaskRepository, times(1)).save(any(TodoTask.class));
    }

    @Test
    void testCreateTaskWithInvalidUser() {
        // Mocking: Benutzer wird nicht gefunden
        when(userRepository.findUserByEmail("invalid@example.com")).thenReturn(null);

        TodoTaskDTO todoTaskDTO = new TodoTaskDTO(null, "Test Task", "Test Description", false, 0);

        // Test und Exception-Handling
        assertThrows(IllegalArgumentException.class, () -> {
            todoTaskService.createTask("invalid@example.com", todoTaskDTO);
        });

        // Verifizierung der Interaktionen
        verify(userRepository, times(1)).findUserByEmail("invalid@example.com");
        verify(todoTaskRepository, times(0)).save(any(TodoTask.class));
    }
}
