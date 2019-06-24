import React, { Component } from "react";
import FlipCard from "./FlipCard/FlipCard";
import { withContext } from "../AppContext";

class TasksForm extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
      preferences: []
    };
  }

  componentDidMount() {
    console.log(
      `tasks coming into TasksForm are ${
        this.props.tasks
      } and the user's past preferences are ${
        this.props.user.preferences
      } but the currently selected tasks are ${this.state.preferences}`
    );
    const tasks = this.props.getTasks();
    tasks.then(result => {
      const data = result.data.map(item => {
        item.isSelected = false;
        return item;
      });
      this.setState({
        tasks: data
      });
    });
  }

  mappedCards = () => {
    const { tasks } = this.state;

    if (tasks.length > 0) {
      return tasks.map((task, index) => {
        return (
          <FlipCard
            task={task}
            key={index}
            id={index}
            handleSelect={this.toggleClick}
            count={this.state.preferences.length}
          />
        );
      });
    } else {
      return <h3>Loading...</h3>;
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    const preferencesIds = this.state.preferences.map(item => item._id);
    const preferencesObject = {
      date: Date.now(),
      preferences: preferencesIds
    };
    this.props.submitPreferences(preferencesObject).then(response => {
      console.log(response.data);
      // get user and add response id to user preferences array...
      // then call submitParticipant with user's username

      const usersPreferences = {
        preferences: this.props.user.preferences
          ? [...this.props.user.preferences, response.data._id]
          : [response.data._id]
      };
      this.props
        .updateUser(this.props.user._id, usersPreferences)
        .then(response => {
          console.log(response.data);
        });
    });
  };

  toggleClick = e => {
    const newArray = this.state.tasks.map(item => {
      return item.title === e.target.title
        ? { ...item, isSelected: !item.isSelected }
        : item;
    });
    const preferences = newArray.filter(item => {
      return item.isSelected;
    });
    console.log(`the currently selected preferences are `, preferences);
    this.setState({ tasks: newArray, preferences });
  };

  render() {
    return (
      <div style={{ maxWidth: "80vw", margin: "0 auto" }}>
        {this.state.preferences.length > 3 ? (
          <div style={{ margin: "50px auto" }}>
            <button
              onClick={this.handleSubmit}
              style={{
                height: "50px",
                width: "100%",
                background: "blue",
                borderRadius: "5px",
                fontSize: "1.5rem"
              }}
            >
              Submit
            </button>
          </div>
        ) : null}
        {this.mappedCards()}
      </div>
    );
  }
}

export default withContext(TasksForm);
