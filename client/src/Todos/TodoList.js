import React from 'react';
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm"
import { withContext } from "../AppContext";


// class TodoList extends React.Component {
//   constructor() {
//     super()
//     this.state = {
//     options: [],
//     }
//
//
//
//
//   }
//   

// }



function TodoList(props) {

    const todos = props.todos.map(todo => {
        return (
            <Todo
                key={todo._id}
                todo={todo}
                editTodo={props.editTodo}
                deleteTodo={props.deleteTodo}
            />
        )
    })

    return (
        <main>


           <h1> Is this the thing to edit</h1>
           {console.log("props in todo list", props)}
            <AddTodoForm addTodo={props.addTodo} />
            {todos}
        </main>
    )
}

export default withContext(TodoList);
