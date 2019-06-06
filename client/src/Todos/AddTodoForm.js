import React, { Component } from 'react';

class AddTodoForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            selectValue: ""
        }
    }

    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    optionChangeHandler = (e) => {
      console.log("opt change handler", e)


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

    render() {
        return (
            <div>
           <select value={this.state.selectValue} onChange={this.optionChangeHandler}>
             <option value="null">Pick a Task</option>
             <option value="OpenSource">Open Source</option>
             <option value="ReadCode">Read Code</option>
             <option value="learnNewLanguage">Learn a new language</option>
             <option value="qa">QA</option>
           </select>
                <form onSubmit={this.handleSubmit}>
                    <h4>Add New Todo</h4>

                    <input
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        type="text"
                        placeholder="Title"/>

                    <button>+</button>
                </form>
            </div>
        )
    }
}

export default AddTodoForm;
