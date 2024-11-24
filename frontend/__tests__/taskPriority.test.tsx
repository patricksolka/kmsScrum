import Home from '../src/app/page';
import {fireEvent, screen, render} from "@testing-library/react";

// Test case: Should mark a task as prioritized when the "Priority" button is clicked
test('should mark task as prioritized when star button is clicked', () => {
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

    // Prioritize task using the "Priority" button
    const starButton = screen.getByLabelText('Toggle priority');
    fireEvent.click(starButton);

    // Verify if the first task is marked as prioritized
    const task = screen.getByText('Task 1');
    expect(task.parentElement).toHaveClass('bg-yellow-300');
});
