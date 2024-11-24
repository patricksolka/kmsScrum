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
    const moveUpButton = screen.getAllByText('Up')[1];
    fireEvent.click(moveUpButton);

    // Verify if the tasks have been swapped
    const tasks = screen.getAllByRole('listitem');
    expect(tasks[0].textContent).toContain('Task 2');
    expect(tasks[1].textContent).toContain('Task 1');
});