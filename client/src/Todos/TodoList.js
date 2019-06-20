import React, { useEffect, useState } from "react";
import { Ul } from "../styles/GlobalStyles";
import { withContext } from "../AppContext";

function TodoList(props) {
  console.log(props);
  const [skills, setSkills] = useState([]);

  useEffect(() => {
    setSkills(props.user.skills);
  });

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
    </main>
  );
}

export default withContext(TodoList);
