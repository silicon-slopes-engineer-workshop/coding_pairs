import React, { Component } from 'react';
const options = ["QA", "Open Source", "Read Code"]

class AddTodoForm extends Component {
    constructor() {
        super();
        this.state = {
            title: "",
            checkboxes: options.reduce((options, option) => ({...options, [option]: false}))

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
           <form>
             <label for="open source">Open Source</label>
             <input type="checkbox" name="open source" onChange={this.optionChangeHandler}/>
             <label for="QA">QA</label>
             <input type="checkbox" name="open source" onChange={this.optionChangeHandler}/>
             <input type="submit" value="Submit" />
           </form>
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
