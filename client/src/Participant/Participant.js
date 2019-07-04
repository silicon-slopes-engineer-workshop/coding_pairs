import React, { useEffect, useState } from "react";
import { Ul } from "../styles/GlobalStyles";
import { withContext } from "../AppContext";
import TasksForm from "./TasksForm";

function Participant(props) {
  const [skills, setSkills] = useState([]);
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    console.log(
      `tasks coming into Participant are ${props.tasks} and preferences are ${
        props.user.preferences
      }`
    );
    console.log(props);
    setSkills(props.user.skills);
    if (props.user.preferences.length < 1) {
      const id = props.user.preferences[props.user.preferences.length - 1];

      props.getPreferences(id).then(response => {
        setPreferences(response.data);
      });
    } else {
      props
        .getPreferences(
          props.user.preferences[props.user.preferences.length - 1]
        )
        .then(response => {
          setPreferences(response.data);
        });
    }
  }, [props.user]);

  let userSkills = [];

  if (skills) {
    userSkills = skills.map((item, index) => <li key={index}>{item}</li>);
  }

  return (
    <main>
      {skills ? (
        <div>
          <h5>{props.user.username}'s Skills:</h5>
          <Ul>{userSkills}</Ul>
        </div>
      ) : (
        <p>Loading skills</p>
      )}

      {preferences.date &&
      new Date(preferences.date).toDateString() ===
        new Date().toDateString() ? (
        <div> You're ready to go!</div>
      ) : (
        <TasksForm />
      )}
    </main>
  );
}

export default withContext(Participant);
