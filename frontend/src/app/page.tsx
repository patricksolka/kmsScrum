'use client';

import React, { useState, useEffect } from 'react';
import { redirect } from 'next/navigation';

export default function Home() {
  const [tasks, setTasks] = useState<
    { id: string; task: string; description: string; isPrioritized?: boolean }[]
  >([]);
  const [taskInput, setTaskInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTaskInput, setEditTaskInput] = useState('');
  const [editDescInput, setEditDescInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Fetching data from API
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Passe dies an deine Authentifizierungsmethode an
    if (!token) {
      // Falls kein Token vorhanden, weiterleiten zur Login-Seite
      redirect('/login');
      return;
    }
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/tasks', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          credentials: 'include'
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch tasks: ${response.statusText}`);
        }
        const data = await response.json();
        console.log(data);
        setTasks(data);
      } catch (error) {
        console.error(error);
        alert('Es gab ein Problem beim Abrufen der Aufgaben.');
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (taskInput === '') {
      alert('Bitte geben Sie eine Aufgabe ein!');
      return;
    }

    const newTask = { task: taskInput, description: descInput };

    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch('http://localhost:8080/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newTask)
      });

      if (response.ok) {
        const addedTask = await response.json();
        console.log('Hinzufügte Aufgabe:', addedTask);
        setTasks((prevTasks) => [...prevTasks, addedTask]);
        setTaskInput(''); // Zurücksetzen des Task-Inputs
        setDescInput(''); // Zurücksetzen des Description-Inputs
      } else {
        console.error(
          'Fehler beim Hinzufügen der Aufgabe:',
          response.statusText
        );
      }
    } catch (error) {
      console.error('Fehler beim Hinzufügen der Aufgabe:', error);
    }
  };

  const handleEdit = (index: number) => {
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    setEditTaskInput(taskToEdit.task);
    setEditDescInput(taskToEdit.description);
    setIsModalOpen(true);
  };

  /*const handleSaveEdit = () => {
    if (editTaskInput === '') {
      alert('Bitte geben Sie eine Aufgabe ein!');
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[editingIndex!] = {
      task: editTaskInput,
      description: editDescInput
    };
    setTasks(updatedTasks);

    setEditingIndex(null);
    setEditTaskInput('');
    setEditDescInput('');
    setIsModalOpen(false);
  };*/
  const handleSaveEdit = () => {
    if (editTaskInput === '') {
      alert('Bitte geben Sie eine Aufgabe ein!');
      return;
    }

    const updatedTasks = [...tasks];
    updatedTasks[editingIndex!] = {
      ...updatedTasks[editingIndex!],
      task: editTaskInput,
      description: editDescInput
    };
    setTasks(updatedTasks);

    setEditingIndex(null);
    setEditTaskInput('');
    setEditDescInput('');
    setIsModalOpen(false);
  };
  const handleDelete = async (index: number) => {
    const taskToDelete = tasks[index]; // Hole die Aufgabe, die gelöscht werden soll

    // Sende die DELETE-Anfrage an das Backend, dabei wird die ID dynamisch in die URL eingefügt
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(
        `http://localhost:8080/tasks/${taskToDelete.id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (!response.ok) {
        throw new Error('Fehler beim Löschen der Aufgabe');
      }

      // Wenn das Löschen auf dem Server erfolgreich war, entferne die Aufgabe aus dem Zustand
      const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
      setTasks(updatedTasks); // Aktualisiere den Zustand
    } catch (error) {
      console.error('Fehler beim Löschen der Aufgabe:', error);
      alert('Es gab ein Problem beim Löschen der Aufgabe.');
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
    setEditTaskInput('');
    setEditDescInput('');
  };

  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index - 1], updatedTasks[index]] = [
      updatedTasks[index],
      updatedTasks[index - 1]
    ];
    setTasks(updatedTasks);
  };

  const handleMoveDown = (index: number) => {
    if (index === tasks.length - 1) return;
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index]
    ];
    setTasks(updatedTasks);
  };

  const handleTogglePriority = (index: number) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = {
      ...updatedTasks[index],
      isPrioritized: !updatedTasks[index].isPrioritized
    };
    setTasks(updatedTasks);
  };

  return (
    <>
      <div
        id="todo-app"
        className="container mx-auto p-4 mt-4 md:p-6 lg:p-8 xl:p-10"
      >
        <h2 className="text-3xl font-bold text-center mb-4">To-Do Liste</h2>
        <form onSubmit={handleSubmit} className="flex justify-center">
          <input
            type="text"
            id="todo-input"
            placeholder="Add a new task..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            className="w-64 ps-2 text-sm text-gray-700 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 mr-4"
          />
          <input
            type="text"
            id="todo-desc"
            placeholder="Description..."
            value={descInput}
            onChange={(e) => setDescInput(e.target.value)}
            className="w-64 ps-2 text-sm text-gray-700 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <button
            type="submit"
            className="bg-green-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded ml-4"
          >
            Add
          </button>
        </form>
      </div>

      <ul id="ToDoListe" className="container mx-auto list-none m-0 p-0">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded-lg p-4 mb-4 flex justify-between items-center"
          >
            <div className="flex space-x-2 mr-4">
              <button
                onClick={() => handleMoveUp(index)}
                className="text-white font-bold py-1 px-3 rounded bg-purple-700 hover:bg-gray-800"
                aria-label="Move up"
              >
                ▲
              </button>
              <button
                onClick={() => handleMoveDown(index)}
                className="text-white font-bold py-1 px-3 rounded bg-purple-700 hover:bg-gray-800"
                aria-label="Move down"
              >
                ▼
              </button>
            </div>

            <div className="flex-1 ml-4">
              <strong className="block text-lg font-semibold">
                {task.task}
              </strong>
              <small className="block text-sm text-gray-500">
                {task.description}
              </small>
            </div>

            <div className="ml-4 flex space-x-2">
              <button
                onClick={() => handleTogglePriority(index)}
                aria-label={`Toggle priority for ${task.task}`}
                className={`text-2xl ${
                  task.isPrioritized ? 'text-yellow-500' : 'text-gray-500'
                } hover:text-yellow-500`}
                style={{ background: 'none', border: 'none', outline: 'none' }}
              >
                ★
              </button>

              <button
                onClick={() => handleEdit(index)}
                className="bg-blue-500 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="bg-red-500 hover:bg-gray-800 text-white font-bold py-1 px-3 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-2xl font-bold mb-4">Edit Task</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSaveEdit();
              }}
            >
              <input
                type="text"
                value={editTaskInput}
                onChange={(e) => setEditTaskInput(e.target.value)}
                className="w-full p-2 mb-4 text-sm text-gray-700 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Task"
              />
              <input
                type="text"
                value={editDescInput}
                onChange={(e) => setEditDescInput(e.target.value)}
                className="w-full p-2 mb-4 text-sm text-gray-700 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600"
                placeholder="Description"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-4 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
