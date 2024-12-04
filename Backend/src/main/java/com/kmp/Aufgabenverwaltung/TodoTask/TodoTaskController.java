package com.kmp.Aufgabenverwaltung.TodoTask;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TodoTaskController {

    private final TodoTaskService todoTaskService;

    @Autowired
    public TodoTaskController(TodoTaskService todoTaskService) {
        this.todoTaskService = todoTaskService;
    }

    @GetMapping
    public ResponseEntity<List<TodoTaskDTO>> getTasksByUser(@AuthenticationPrincipal String email) {
        return ResponseEntity.ok(todoTaskService.getTasksByUser(email));
    }

    @PostMapping
    public ResponseEntity<TodoTaskDTO> createTask(@AuthenticationPrincipal String email, @RequestBody TodoTaskDTO todoTaskDTO) {
        TodoTaskDTO createdTask = todoTaskService.createTask(email, todoTaskDTO);
        return ResponseEntity.status(201).body(createdTask);
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<TodoTaskDTO> updateTask(@AuthenticationPrincipal String email, @PathVariable Long taskId, @RequestBody TodoTaskDTO updatedTodoTaskDTO) {
        return ResponseEntity.ok(todoTaskService.updateTask(email, taskId, updatedTodoTaskDTO));
    }

    @PutMapping("/reorder")
    public ResponseEntity<Void> updateTaskOrder( @AuthenticationPrincipal String email,  @RequestBody List<TodoTaskDTO> updatedTasks) {
        todoTaskService.updateTaskOrder(email, updatedTasks);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{taskId}")
    public ResponseEntity<Void> deleteTask(@AuthenticationPrincipal String email, @PathVariable Long taskId) {
        todoTaskService.deleteTask(email, taskId);
        return ResponseEntity.noContent().build();
    }
}
