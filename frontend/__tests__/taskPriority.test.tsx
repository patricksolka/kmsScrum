import Home from '../src/app/page';
import {fireEvent, screen, render} from "@testing-library/react";
import '@testing-library/jest-dom';


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

    // Prioritize the first task using the appropriate "Priority" button
    const starButtons = screen.getAllByLabelText(/Toggle priority for/i);
    fireEvent.click(starButtons[0]); // Click the "Priority" button for Task 1

    // Verify if the first task is marked as prioritized (check the button's class)
    expect(starButtons[0]).toHaveClass('text-yellow-500');

    // Verify if the second task is NOT marked as prioritized (check the button's class)
    expect(starButtons[1]).toHaveClass('text-gray-500');

    // Click the star button again to remove the priority
    fireEvent.click(starButtons[0]); // Un-prioritize Task 1

    // Verify if the first task is no longer prioritized (check the button's class)
    expect(starButtons[0]).toHaveClass('text-gray-500');
});
