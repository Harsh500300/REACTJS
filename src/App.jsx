import React, { useState } from "react";

const App = () => {
  const [todolist, setTodolist] = useState([]);

  const saveTodoList = (event) => {
    event.preventDefault();
    const toname = event.target.todoname.value.trim();

    if (!toname) {
      alert("Task cannot be empty!");
      return;
    }

    if (!todolist.includes(toname)) {
      setTodolist([...todolist, toname]);
    } else {
      alert("Todo already exists!");
    }

    event.target.reset(); // Clears input after submission
  };

  return (
    <div className="w-full h-screen flex flex-col items-center bg-gradient-to-br from-purple-500 to-blue-400 p-6">
      <h1 className="text-4xl font-bold text-white my-6 shadow-lg">🚀 TODO List</h1>
      <form onSubmit={saveTodoList} className="flex gap-4 mb-6">
        <input
          type="text"
          name="todoname"
          placeholder="Enter Your Task"
          className="outline-none w-64 px-3 py-2 text-lg rounded shadow-md bg-white placeholder-gray-400 focus:ring-2 focus:ring-purple-500"
        />
        <button className="px-4 py-2 bg-purple-600 text-white font-semibold rounded hover:bg-purple-700 transition-all shadow-md">
          Save
        </button>
      </form>

      {/* Task list only appears if todolist is not empty */}
      {todolist.length > 0 && (
        <ul className="w-1/2 bg-white rounded-lg p-4 shadow-lg">
          {todolist.map((value, idx) => (
            <TodolistItem key={idx} value={value} idx={idx} todolist={todolist} setTodolist={setTodolist} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default App;

const TodolistItem = ({ value, idx, todolist, setTodolist }) => {
  const [status, setStatus] = useState(false);

  const deleteRow = (event) => {
    event.stopPropagation(); // Prevents click from affecting strikethrough state
    setTodolist(todolist.filter((_, i) => i !== idx));
  };

  return (
    <li
      className="flex justify-between items-center py-2 px-4 bg-gray-100 rounded-lg mb-2 transition-all hover:bg-gray-200 cursor-pointer"
      onClick={() => setStatus(!status)}
    >
      <span className={`text-lg ${status ? "line-through text-gray-500" : ""}`}>
        {idx + 1}. {value}
      </span>
      <span
        onClick={deleteRow}
        className="text-red-500 text-2xl cursor-pointer hover:scale-125 transition-transform"
        style={{ textDecoration: "none" }} // Prevent strikethrough on delete icon
      >
        ✖
      </span>
    </li>
  );
};