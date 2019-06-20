import React, { useEffect, useState } from "react";
import { withContext } from "../AppContext";
import mockUsers from "./UserMock";


function Admin(props) {
  console.log(props);
  const [usernames, setUsernames] = useState([]);

  useEffect(() => {
    setUsernames(mockUsers);
  });

  
  let users = []

  if (usernames) {
    users = usernames.map((item, index) => <li key={index}>{item.username}</li>);
  }

  return (
    <main>
        <ul>{users}</ul>
        <button onClick={ () => {
      usernames 
      console.log(usernames)
      // API Call here 
  }}>Pair Up</button>
    </main>
  );
}

export default withContext(Admin);
