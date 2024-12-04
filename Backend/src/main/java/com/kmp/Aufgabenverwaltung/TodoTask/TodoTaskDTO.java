package com.kmp.Aufgabenverwaltung.TodoTask;

public class TodoTaskDTO {
    private Long id;
    private String title;
    private String description;
    private boolean completed;
    private Integer order;

    public TodoTaskDTO(Long id, String title, String description, boolean completed, Integer order) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.completed = completed;
        this.order = order;
    }

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

    public Integer getOrder() { return order; }

    public void setOrder(Integer order) { this.order = order; }
}
