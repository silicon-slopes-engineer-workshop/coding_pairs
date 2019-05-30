import React, { Component } from "react";
import { withContext } from "../AppContext";
import styled from "styled-components";
import { Button, SignupForm, Inputs, Select } from "../styles/AuthStyles.js";
import { H1 } from "../styles/GlobalStyles.js";
import { skills } from "../constants/skills";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      skill: null
    };
  }

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  clearInputs = () => {
    this.setState({
      username: "",
      password: "",
      errorMessage: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props
      .signup(this.state)
      .then(() => this.props.history.push("/todos"))
      .catch(err => {
        this.setState({ errorMessage: err.response.data.message });
      });
  };

  render() {
    return (
      <div className="form-wrapper">
        <SignupForm onSubmit={this.handleSubmit}>
          <H1>Sign Up</H1>
          <Select
            type="select"
            name="skill"
            header="Skills"
            onChange={this.handleChange}
          >
            <option>Choose a skill</option>
            {skills.map((item, index) => (
              <option key={index} value={index}>
                {item}
              </option>
            ))}
          </Select>
          {this.state.skill ? skills[this.state.skill] : null}
          <Inputs
            onChange={this.handleChange}
            value={this.state.username}
            name="username"
            type="text"
            placeholder="Username"
          />
          <Inputs
            onChange={this.handleChange}
            value={this.state.password}
            name="password"
            type="password"
            placeholder="Password"
          />
          <Button type="submit">Create Account</Button>
        </SignupForm>

        {this.state.errorMessage && (
          <p style={{ color: "red" }}>{this.state.errorMessage}</p>
        )}
      </div>
    );
  }
}

export default withContext(Signup);
