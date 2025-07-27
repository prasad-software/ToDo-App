import React, { useState } from 'react';

const TodoList = () => {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (task.trim() === '') return;

    if (editIndex !== null) {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(null);
    } else {
      setTasks([...tasks, task]);
    }
    setTask('');
  };

  const handleDelete = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const handleEdit = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };

  return (
    <div className="min-h-screen  flex flex-col items-center p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-indigo-800 mb-6 text-center">📋 To-Do List</h1>

      {/* Input + Button Row */}
      <div className="flex w-full max-w-md sm:max-w-2xl mb-6">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter a task..."
          className="flex-grow h-12 px-4 border border-gray-300 rounded-l-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTask}
          className="h-12 px-6 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 transition"
        >
          {editIndex !== null ? 'Update' : 'Add'}
        </button>
      </div>

      {/* Task List */}
      <ul className="w-full max-w-md sm:max-w-2xl space-y-4">
        {tasks.map((t, index) => (
          <li
            key={index}
            className="bg-white border border-gray-200 shadow-lg px-4 py-4 rounded-xl flex justify-between items-center"
          >
            <span className="text-gray-800 w-3/4 break-words">{t}</span>
            <div className="flex gap-3">
              <button
                onClick={() => handleEdit(index)}
                className="text-green-600 hover:text-green-800 text-xl"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={() => handleDelete(index)}
                className="text-red-600 hover:text-red-800 text-xl"
                title="Delete"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
