package com.kmp.Aufgabenverwaltung.TodoTask;

import com.kmp.Aufgabenverwaltung.User.User;
import com.kmp.Aufgabenverwaltung.User.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class TodoTaskService {

    private final TodoTaskRepository todoTaskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TodoTaskService(TodoTaskRepository todoTaskRepository, UserRepository userRepository) {
        this.todoTaskRepository = todoTaskRepository;
        this.userRepository = userRepository;
    }

    public TodoTaskDTO createTask(String email, TodoTaskDTO todoTaskDTO) {
        User user = userRepository.findUserByEmail(email);
        if (user == null) {
            throw new IllegalArgumentException("User not found");
        }

        TodoTask todoTask = convertToEntity(todoTaskDTO);
        todoTask.setUser(user);
        TodoTask savedTask = todoTaskRepository.save(todoTask);
        return convertToDto(savedTask);
    }

    public List<TodoTaskDTO> getTasksByUser(String email) {
        User user = userRepository.findUserByEmail(email);
        return findTasksForUser(user.getId())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TodoTaskDTO updateTask(String email, Long taskId, TodoTaskDTO updatedTodoTaskDTO) {
        User user = userRepository.findUserByEmail(email);
        TodoTask existingTodoTask = getTaskById(taskId);

        if (!existingTodoTask.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("User not authorized to update this task");
        }

        existingTodoTask.setTitle(updatedTodoTaskDTO.getTitle());
        existingTodoTask.setDescription(updatedTodoTaskDTO.getDescription());
        existingTodoTask.setCompleted(updatedTodoTaskDTO.isCompleted());
        TodoTask savedTask = todoTaskRepository.save(existingTodoTask);
        return convertToDto(savedTask);
    }

    public void updateTaskOrder(String email, List<TodoTaskDTO> updatedTasks) {
        User user = userRepository.findUserByEmail(email);
        List<TodoTask> tasks = findTasksForUser(user.getId());

        Map<Long, Integer> taskOrderMap = updatedTasks.stream()
                .collect(Collectors.toMap(TodoTaskDTO::getId, TodoTaskDTO::getOrder));

        tasks.forEach(task -> {
            if (taskOrderMap.containsKey(task.getId())) {
                task.setTaskOrder(taskOrderMap.get(task.getId()));
            }
        });

        todoTaskRepository.saveAll(tasks);
    }

    public void deleteTask(String email, Long taskId) {
        User user = userRepository.findUserByEmail(email);
        TodoTask existingTodoTask = getTaskById(taskId);

        if (!existingTodoTask.getUser().getId().equals(user.getId())) {
            throw new IllegalArgumentException("User not authorized to delete this task");
        }

        todoTaskRepository.deleteById(taskId);
    }

    private List<TodoTask> findTasksForUser(Long userId) {
        return todoTaskRepository.findByUserId(userId);
    }

    public TodoTask getTaskById(Long taskId) {
        return todoTaskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task with ID " + taskId + " not found"));
    }

    private TodoTaskDTO convertToDto(TodoTask task) {
        return new TodoTaskDTO(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.isCompleted(),
                task.getTaskOrder()
        );
    }

    private TodoTask convertToEntity(TodoTaskDTO dto) {
        return new TodoTask(
                dto.getTitle(),
                dto.getDescription(),
                dto.isCompleted(),
                dto.getOrder()
        );
    }
}

