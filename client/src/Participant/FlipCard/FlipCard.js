import React from "react";
import { FlipCard, Button } from "./stylesFlipCard";

export default ({ task, handleSelect, count }) => {
  const flip = e => {
    console.log(e.nativeEvent);
    console.log(e.nativeEvent.target.parentElement);
    e.nativeEvent.target.parentElement.classList.toggle("flipped");
  };

  return (
    <React.Fragment>
      <FlipCard>
        <div className="scene" onClick={flip}>
          <div className="card">
            <div
              className="card_face front"
              style={{ background: task.isSelected ? "green" : null }}
            >
              <h1>{task.title}</h1>
              <p>{task.description}</p>
            </div>

            <div className="card_face back">
              {task.ideas.map((idea, index) => (
                <p key={index}>{idea}</p>
              ))}
            </div>
          </div>
        </div>
        {task.isSelected ? (
          <Button
            title={task.title}
            onClick={e => handleSelect(e)}
            style={{ background: "red" }}
          >
            Remove
          </Button>
        ) : count < 4 ? (
          <Button title={task.title} onClick={e => handleSelect(e)}>
            Select
          </Button>
        ) : null}
      </FlipCard>
    </React.Fragment>
  );
};
