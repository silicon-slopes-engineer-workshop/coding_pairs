import React from "react";
import { Ul } from "../styles/GlobalStyles";

export default ({ skills, handleChange, removeSkill, rating }) => {
  return (
    <div>
      <Ul>
        {skills.map(item => (
          <li key={item + new Date()}>
            <p>
              <button
                style={{ background: "red", margin: "4px" }}
                onClick={e => removeSkill(e, item)}
              >
                Remove{" "}
              </button>
              {item}{" "}
            </p>
          </li>
        ))}
      </Ul>
    </div>
  );
};
