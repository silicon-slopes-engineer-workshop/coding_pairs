import React, { Component } from 'react';
import CheckBoxes from './CheckBoxes'
const items = ["QA", "Open Source", "Read Code"]

class AddTodoForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            checkboxes: items.reduce(
                (options, option) => ({
                  ...options,
                  [option]: false

                }),
                {}
                )

        }
    }

    handleCheckBoxChange = (e) => {
      console.log(e.target.value)
    }

    createCheckBox = option =>{
      <CheckBoxes
        label={option}
        isSelected={this.state.checkboxes[option]}
        onCheckboxChange={this.handleCheckBoxChange}
        key={option}
       />
    }

    createCheckBoxes = () => items.map(this.createCheckBox)

    handleChange = (e) => {
        e.persist();
        const { name, value } = e.target;
        this.setState({
            [name]: value
        })
    }

    optionChangeHandler = (e) => {
      const {value } = e.target
      this.setState({selectValue: value})
      // console.log("state aalue", this.state.selectValue)

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
            {items.map(this.createCheckBoxes)}
             <div>
              {/*loop through the options array */}
             </div>
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
