import Home from '../src/app/page';
import {fireEvent, screen, render} from "@testing-library/react";

// Test case: Should move a task up in the list when the "Up" button is clicked
test('should move task up when up button is clicked', () => {
    render(<Home />);

    // Add tasks to the list
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const descInput = screen.getByPlaceholderText('Description...');
    const addButton = screen.getByText('Add');

    // Add the first task to the list
    fireEvent.change(taskInput, { target: { value: 'Task 1' } });
    fireEvent.change(descInput, { target: { value: 'Description 1' } });
    fireEvent.click(addButton);

    // Add the second task to the list
    fireEvent.change(taskInput, { target: { value: 'Task 2' } });
    fireEvent.change(descInput, { target: { value: 'Description 2' } });
    fireEvent.click(addButton);

    // Move the second task up in the list
    const moveUpButtons = screen.getAllByLabelText('Move up');
    fireEvent.click(moveUpButtons[1]);

    // Verify if the tasks have been swapped
    const tasks = screen.getAllByRole('listitem');
    expect(tasks[0].textContent).toContain('Task 2');
    expect(tasks[1].textContent).toContain('Task 1');
});

// Test case: Should not move the first task up in the list
test('should not move the first task up when the "Up" button is clicked', () => {
    render(<Home />);

    // Add a task to the list
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const descInput = screen.getByPlaceholderText('Description...');
    const addButton = screen.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Task 1' } });
    fireEvent.change(descInput, { target: { value: 'Description 1' } });
    fireEvent.click(addButton);

    // Try to move the first task up (should not do anything)
    const moveUpButton = screen.getAllByLabelText('Move up')[0];
    fireEvent.click(moveUpButton);

    // Verify if the first task is still in the first position
    const tasks = screen.getAllByRole('listitem');
    expect(tasks[0].textContent).toContain('Task 1');
});

// Test case: Should not move the last task down in the list
test('should not move the last task down when the "Down" button is clicked', () => {
    render(<Home />);

    // Add tasks to the list
    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const descInput = screen.getByPlaceholderText('Description...');
    const addButton = screen.getByText('Add');

    // Add the first task to the list
    fireEvent.change(taskInput, { target: { value: 'Task 1' } });
    fireEvent.change(descInput, { target: { value: 'Description 1' } });
    fireEvent.click(addButton);

    // Add the second task to the list
    fireEvent.change(taskInput, { target: { value: 'Task 2' } });
    fireEvent.change(descInput, { target: { value: 'Description 2' } });
    fireEvent.click(addButton);

    // Try to move the last task down (should not do anything)
    const moveDownButton = screen.getAllByLabelText('Move down')[1];
    fireEvent.click(moveDownButton);

    // Verify if the last task is still in the last position
    const tasks = screen.getAllByRole('listitem');
    expect(tasks[1].textContent).toContain('Task 2');
});
