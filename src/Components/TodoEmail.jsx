import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../styles/TodoEmail.css";
let sendMail = true;
const TodoEmail = () => {
  const [todos, setTodos] = useState([]);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [change, setChange] = useState(true);
  const handleAddTodo = (e) => {
    e.preventDefault();
    if (subject && description && dueDate && userEmail) {
      e.preventDefault();
      const newTodo = {
        subject,
        description,
        dueDate,
      };
      setTodos([...todos, newTodo]);
      setSubject("");
      setDescription("");
      setDueDate("");
      setChange(false);
    }
  };

  const handleSendEmail = (todo) => {
    const dueDateTime = new Date(todo.dueDate);
    const currentTime = new Date();
    console.log(dueDateTime.getMonth() == currentTime.getMonth());
    if (dueDateTime.getMonth() == currentTime.getMonth()) {
      const timeDifference = dueDateTime.getTime() - currentTime.getTime();
      setTimeout(() => {
        console.log("called");
        const emailParams = {
          to_email: userEmail, // Replace with the user's email address
          from_name: "YourClock",
          subject: todo.subject,
          message: todo.description,
        };

        emailjs
          .send(
            "service_kc95etj",
            "template_65y08tb",
            emailParams,
            "TyaNsBO2qeyYcLKgd"
          )
          .then(
            (response) => {
              console.log("Email sent:", response);
            },
            (error) => {
              console.error("Error sending email:", error);
            }
          );
      }, timeDifference);
    }
  };
  const handleUpdateTodo = (id) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return {
          ...todo,
          subject,
          description,
          dueDate,
        };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setSubject("");
    setDescription("");
    setDueDate("");
  };

  const handleDeleteTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };
  return (
    <>
      <div className="todo-email-container">
        <form
          onSubmit={handleAddTodo}
          className="form_pop_up"
          style={{ display: change ? "flex" : "none" }}
        >
          <div className="form_close_btn" onClick={() => setChange(false)}>
            X
          </div>
          {/* <h1>Todo List</h1> */}
          <div className="form-group">
            {/* <label htmlFor="subject">Subject:</label> */}
            <input
              type="text"
              id="subject"
              value={subject}
              placeholder="Subject"
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="description">Description:</label> */}
            <textarea
              id="description"
              value={description}
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            {/* <label htmlFor="dueDate">Due Date:</label> */}
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            {/* <label htmlFor="userEmail">Your Email:</label> */}
            <input
              placeholder="Email"
              type="email"
              id="userEmail"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
          <button type="submit">Add Todo</button>
        </form>

        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id}>
              <h3>{todo.subject}</h3>
              <p>{todo.description}</p>
              <p>Due Date: {todo.dueDate}</p>
              <button onClick={() => handleSendEmail(todo)}>Send Email</button>
              <button onClick={() => handleUpdateTodo(todo)}>Edit</button>
              <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
      <button className="add_todo_btn" onClick={() => setChange(true)}>
        +
      </button>
    </>
  );
};

export default TodoEmail;
// testingclock0@gmail.com
// @TestingClock24/7
