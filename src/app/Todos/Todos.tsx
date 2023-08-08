"use client";

import { useEffect, useState, useRef } from "react";
import { nanoid } from "nanoid";

export const Todos = () => {
  const [task, setTask] = useState<{ name: string; id: string }[]>([]);

  let storageTasks: string | null = null;

  useEffect(() => {
    storageTasks = localStorage.getItem("todos");
    storageTasks && setTask(JSON.parse(storageTasks));
  }, [])

  useEffect(() => {
     storageTasks && setTask(JSON.parse(storageTasks));
  }, [storageTasks]);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const inputElement = formElement[0] as HTMLInputElement;
    const newTask = { name: inputElement.value, id: nanoid() };

    if (task.some((el) => el.name === inputElement.value)) {
      alert("This task is already exists!");
    } else {
      setTask((task) => [...task, newTask]);
      localStorage.setItem("todos", JSON.stringify([...task, newTask]));
    }

    formElement.reset();
  };

  const onRemoveTask = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {name} = e.target as HTMLButtonElement;

    setTask((task) => task.filter((el) => el.id !== name));
    storageTasks = JSON.stringify(task.filter((el) => el.id !== name));
    localStorage.setItem("todos", storageTasks);
  };

  return (
    <>
      <h2>All Tasks</h2>
      <form onSubmit={onSubmit}>
        <input placeholder="Input your task" />
        <button type="submit">Add task</button>
      </form>
      <ol>
        {task.map(({ id, name }) => (
          <div key={id}>
            <li>{name}</li>
            <button name={id} onClick={onRemoveTask}>
              Remove task
            </button>
          </div>
        ))}
      </ol>
    </>
  );
};
