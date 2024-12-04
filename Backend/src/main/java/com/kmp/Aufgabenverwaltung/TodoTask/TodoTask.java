package com.kmp.Aufgabenverwaltung.TodoTask;

import com.kmp.Aufgabenverwaltung.User.User;
import jakarta.persistence.*;

@Entity
public class TodoTask {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    private String description;

    private boolean completed;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private Integer taskOrder;

    public TodoTask(String title, String description, boolean completed, Integer taskOrder) {
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.taskOrder = taskOrder;
    }

    public TodoTask() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Integer getTaskOrder() { return taskOrder; }

    public void setTaskOrder(Integer taskOrder) { this.taskOrder = taskOrder; }
}
