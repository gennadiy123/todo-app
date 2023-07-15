"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";

let tasks = ["Repair a car", "Find a job"];

export const Todos = () => {
  const [task, setTask] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    localStorage.getItem("todos");
  }, []);

  const onSubmit: React.FormEventHandler<HTMLFormElement> = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const formElement = e.currentTarget as HTMLFormElement;
    const inputElement = formElement[0] as HTMLInputElement;
    if (task.some((el) => el.name === inputElement.value)) {
      alert("This task is already exists!");
    } else {
      setTask([...task, { name: inputElement.value, id: nanoid() }]);
    }

    formElement.reset();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input placeholder="Input your task" />
        <button type="submit">Add task</button>
      </form>
      <ol>
        {task.map((el) => (
          <li key={el.id}>{el.name}</li>
        ))}
      </ol>
    </>
  );
};
