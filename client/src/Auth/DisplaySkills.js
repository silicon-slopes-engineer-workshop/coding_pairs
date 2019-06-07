import React from "react";
import { Ul } from "../styles/GlobalStyles";
import { Button } from "../styles/AuthStyles";

export default ({ skills, skillsList, removeSkill }) => {
  return (
    <div>
      <Ul>
        {skills.map(item => (
          <li key={item + new Date()}>
            <p>
              {skillsList[item]}{" "}
              <span style={{ margin: "0 5px" }}>
                <button
                  style={{ background: "red" }}
                  onClick={e => removeSkill(e, item)}
                >
                  -
                </button>
              </span>
            </p>
          </li>
        ))}
      </Ul>
    </div>
  );
};
