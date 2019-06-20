import React, { Component } from "react";
import { withContext } from "../AppContext";

import { Button, SignupForm, Inputs, Select } from "../styles/AuthStyles.js";
import { H1 } from "../styles/GlobalStyles.js";
import { skills } from "../constants/skills";
import DisplaySkills from "./DisplaySkills";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      skills: []
    };
  }

  handleChange = e => {
    const { name, value } = e.target;

    if (name === "skills") {
      this.setState({
        skills: [...this.state.skills, value]
      });
    } else {
      this.setState({
        [name]: value
      });
    }
  };

  removeSkill = (e, item) => {
    e.preventDefault();
    const updatedList = this.state.skills.filter(skill => {
      return skill !== item;
    });
    this.setState({
      skills: updatedList
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
          <p>Use the drop down to select as many skills as desired.</p>
          <Select type="select" name="skills" onChange={this.handleChange}>
            <option>Choose your skills</option>
            {skills.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </Select>
          {this.state.skills.length > 0 ? (
            <DisplaySkills
              skills={this.state.skills}
              removeSkill={this.removeSkill}
              handleChange={this.handleChange}
            />
          ) : null}
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
