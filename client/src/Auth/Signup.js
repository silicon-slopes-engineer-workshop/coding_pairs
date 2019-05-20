import React, { Component } from 'react';
import { withContext } from "../AppContext"
import styled from 'styled-components'

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: black solid 1px;
  border-radius: 10px;
  width: 33%;
  // height: 150px;
  padding: 3%;
`

const Inputs = styled.input`
  width: 75%;
  height: 50px;
  margin: 1%;
`

const Button = styled.button`
  width: 75%;
  height 50px;
  margin: 1%;
  background: #43B3E0;
`


class Signup extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errorMessage: ""
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    clearInputs = () => {
        this.setState({
            username: "",
            password: "",
            errorMessage: ""
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.state)
            .then(() => this.props.history.push("/todos"))
            .catch(err => {
                this.setState({errorMessage: err.response.data.message})
            })
    }


    render() {
        return (
            <div className="form-wrapper">
                <SignupForm onSubmit={this.handleSubmit}>
                    <h3>Sign Up</h3>
                    <Inputs
                        onChange={this.handleChange}
                        value={this.state.username}
                        name="username"
                        type="text"
                        placeholder="Username"/>
                    <Inputs
                        onChange={this.handleChange}
                        value={this.state.password}
                        name="password"
                        type="password"
                        placeholder="Password"/>
                    <Button type="submit">Create Account</Button>
                </SignupForm>

                {
                    this.state.errorMessage &&
                    <p style={{color: "red"}}>{this.state.errorMessage}</p>
                }

            </div>
        )
    }
}

export default withContext(Signup);



