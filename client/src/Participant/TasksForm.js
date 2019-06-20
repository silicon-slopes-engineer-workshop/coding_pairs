import React, { Component } from 'react';

class TasksForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            // tasks: ['Solve Issues', 'Read Code', 'Learn Language / Framework', 'Open Source', 'Build Small App', 'Testing', 'Write Tutorial', 'Coding Challenge'],
            tasks: [    {title: 'Solve Issues', isSelected: false },
                        {title: 'Read Code', isSelected: false}
            ],
            selectedItems: []
        }
    }

    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            title: ""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.addTodo(this.state)
            .then(response => {
                this.clearInputs()
            })
            .catch(err => console.error(err.response.data.message))
    }

    toggleClick = (e) => {
        const newArray = this.state.tasks.map(item => {
            return item.title === e.target.title ? {title: item.title, isSelected: true} : item
        })
        this.setState({tasks: newArray})
    }

    render() {
        let mappedCards = this.state.tasks.map((task, index) => {
            return (
                <div key={index} title={task.title} id={index} selected={task.isSelected} style={{border: '1px solid black', height: '20vh', width: '20vw', margin: '10px', display: 'inline-block', backgroundColor: this.selected ? 'green' : 'red'  }} onClick={(e) => this.toggleClick(e)} >
                    <h5>{task.title}</h5>
                    <p>description here</p>
                    <p>image here</p>
                </div>
            )
        })
        return (
            <div>
                {mappedCards}
                {/* <form onSubmit={this.handleSubmit}>
                    <h4>Add New Todo</h4>

                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Title"/>

                    <button>+</button>
                </form> */}
            </div>
        )
    }
}

export default TasksForm;
