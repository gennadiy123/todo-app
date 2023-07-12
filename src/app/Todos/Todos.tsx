"use client";

import { useEffect, useState } from "react";

let tasks = ["Repair a car", "Find a job"];

export const Todos = () => {
  const [task, setTask] = useState("");

  useEffect(() => {
    localStorage.getItem("todos");
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    setTask(e.target[0].value)
    e.target.reset()
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input placeholder="Input your task" />
        <button type="submit">Add task</button>
      </form>
      <p>{task}</p>
    </>
  );
};
