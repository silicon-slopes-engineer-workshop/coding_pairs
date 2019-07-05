import React, { useEffect, useState } from "react";
import { withContext } from "../AppContext";
import { Ul, SideBar } from "./ParticipantStyles";

const Waiting = props => {
  console.log(props);

  const [tasks, setTasks] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const tasks = props.preferences.preferences.map(item => {
      return props.getTask(item);
    });
    setTasks(tasks);
  }, []);

  useEffect(() => {
    const users = props.users;

    setParticipants(
      users.filter(item => {
        console.log(item);
        return props
          .getPreferences(item.preferences[item.preferences.length - 1])
          .then(response => {
            console.log(response.data);
            const time = new Date(response.data.date);
            return time.toDateString() === new Date().toDateString()
              ? response.data
              : null;
          });
      })
    );
  }, [props.users]);

  const displayPreferences = () => {
    console.log(props.userTasks);
    return props.userTasks.length === 4 ? (
      props.userTasks.map(task => <li key={task._id}>{task.title}</li>)
    ) : (
      <li>Loading your tasks...</li>
    );
  };

  const displayUsers = () => {
    console.log(participants);
    return participants.length > 0 ? (
      participants.map(user => {
        console.log(user.username);
        return <li key={user._id}>{user.username}</li>;
      })
    ) : (
      <li key={new Date().toString()}>
        <h4>Loading Participants...</h4>
      </li>
    );
  };

  return (
    <div>
      <SideBar>
        <h3>Logged in users</h3>
        <Ul>{displayUsers()}</Ul>
      </SideBar>
      <h1>You're ready to go!</h1>

      <h2>The tasks you've chosen to work on are:</h2>
      <Ul>{displayPreferences()}</Ul>
    </div>
  );
};

export default withContext(Waiting);
