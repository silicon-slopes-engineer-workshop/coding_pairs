import React, { useEffect, useState } from "react";
import FlipCard from "./FlipCard/FlipCard";
import { withContext } from "../AppContext";

function TasksForm(props) {
  const [tasks, setTasks] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const tasks = props.getTasks();
    tasks.then(result => {
      const data = result.data.map(item => {
        item.isSelected = false;
        return item;
      });
      setTasks(data);
    });
  }, []);

  const mappedCards = () => {
    if (tasks.length > 0) {
      return tasks.map((task, index) => {
        return (
          <FlipCard
            task={task}
            key={index}
            id={index}
            handleSelect={toggleClick}
            count={preferences.length}
          />
        );
      });
    } else {
      return <h3>Loading...</h3>;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    const preferencesIds = preferences.map(item => item._id);
    const preferencesObject = {
      date: Date.now(),
      preferences: preferencesIds
    };
    props.submitPreferences(preferencesObject).then(response => {
      console.log(response.data);
      // get user and add response id to user preferences array...
      // then call submitParticipant with user's username

      const usersPreferences = {
        preferences: props.user.preferences
          ? [...props.user.preferences, response.data._id]
          : [response.data._id]
      };
      props.updateUser(props.user._id, usersPreferences).then(response => {
        console.log(response.data);
      });
    });
  };

  const toggleClick = e => {
    const newArray = tasks.map(item => {
      return item.title === e.target.title
        ? { ...item, isSelected: !item.isSelected }
        : item;
    });
    const preferences = newArray.filter(item => {
      return item.isSelected;
    });
    console.log(`the currently selected preferences are `, preferences);
    setTasks(newArray);
    setPreferences(preferences);
  };

  return (
    <div style={{ maxWidth: "80vw", margin: "0 auto" }}>
      {preferences.length > 3 ? (
        <div style={{ margin: "50px auto" }}>
          <button
            onClick={handleSubmit}
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
      {mappedCards()}
    </div>
  );
}

export default withContext(TasksForm);
