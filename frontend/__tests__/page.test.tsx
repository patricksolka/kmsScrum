import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Home from '../src/app/page';

describe('Page', () => {
  // Heading anzeigen
  it('renders a heading', () => {
    render(<Home />);

    const heading = screen.getByRole('heading', { level: 2 });

    expect(heading).toBeInTheDocument();
  });

  // Neue Aufgabe hinzufügen
  it('adds a new task', () => {
    render(<Home />);

    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const descInput = screen.getByPlaceholderText('Description...');
    const addButton = screen.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Kaffee kochen' } });
    fireEvent.change(descInput, {
      target: { value: 'Mach dir einen Kaffee!' }
    });

    fireEvent.click(addButton);

    expect(screen.getByText('Kaffee kochen')).toBeInTheDocument();
    expect(screen.getByText('Mach dir einen Kaffee!')).toBeInTheDocument();
  });

  /* // Aufgabe bearbeiten
  it('edits an existing task', () => {
    render(<Home />);

    const taskInput = screen.getByPlaceholderText('Add a new task...');
    const descInput = screen.getByPlaceholderText('Description...');
    const addButton = screen.getByText('Add');

    fireEvent.change(taskInput, { target: { value: 'Test Task' } });
    fireEvent.change(descInput, { target: { value: 'Test Description' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();

    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);

    const editTaskInput = screen.getByPlaceholderText('Task');
    const editDescInput = screen.getByPlaceholderText('Description');

    fireEvent.change(editTaskInput, { target: { value: 'Updated Task' } });
    fireEvent.change(editDescInput, {
      target: { value: 'Updated Description' }
    });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    expect(screen.getByText('Updated Task')).toBeInTheDocument();
    expect(screen.getByText('Updated Description')).toBeInTheDocument();

    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
    expect(screen.queryByText('Test Description')).not.toBeInTheDocument();
  });*/
});
