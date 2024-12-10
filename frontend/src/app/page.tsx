'use client';

import React, { useState } from 'react';

export default function Home() {
  const [tasks, setTasks] = useState<
    { task: string; description: string; isPrioritized?: boolean }[]
  >([]);
  const [taskInput, setTaskInput] = useState('');
  const [descInput, setDescInput] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editTaskInput, setEditTaskInput] = useState('');
  const [editDescInput, setEditDescInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (taskInput === '') {
      alert('Bitte geben Sie eine Aufgabe ein!');
      return;
    }

    const newTask = { task: taskInput, description: descInput };
    setTasks((prevTasks) => [...prevTasks, newTask]);

    setTaskInput('');
    setDescInput('');
  };

  const handleEdit = (index: number) => {
    const taskToEdit = tasks[index];
    setEditingIndex(index);
    setEditTaskInput(taskToEdit.task);
    setEditDescInput(taskToEdit.description);
    setIsModalOpen(true);
  };

  const handleSaveEdit = () => {
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
  };

  const handleDelete = (index: number) => {
    const updatedTasks = tasks.filter((_, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingIndex(null);
    setEditTaskInput('');
    setEditDescInput('');
  };

  // Moves the task up by one position if it's not the first task
  const handleMoveUp = (index: number) => {
    if (index === 0) return; // Cannot move the first task up
    const updatedTasks = [...tasks];
    [updatedTasks[index - 1], updatedTasks[index]] = [
      updatedTasks[index],
      updatedTasks[index - 1]
    ];
    setTasks(updatedTasks);
  };

  // Moves the task down by one position if it's not the last task
  const handleMoveDown = (index: number) => {
    if (index === tasks.length - 1) return; // Cannot move the last task down
    const updatedTasks = [...tasks];
    [updatedTasks[index], updatedTasks[index + 1]] = [
      updatedTasks[index + 1],
      updatedTasks[index]
    ];
    setTasks(updatedTasks);
  };

  // Toggles the priority status of a task
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
