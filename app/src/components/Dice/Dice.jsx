import React, { useState } from "react";
import { Button } from 'rsuite';
import $ from "jquery";

import "./Dice.css";

function Dice() {
  const [selectedFace, setSelectedFace] = useState();

  const handleFaceClick = (faceNumber) => {
    reset();
    rollTo(faceNumber);
  };

  const handleRollClick = (e) => {
    reset();
    $die.addClass("rolling");
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      $die.removeClass("rolling");
      rollTo(randomFace());
      e.target.disabled = false;
    }, animationDuration);

    return false;
  };

  const reset = () => {
    $die.attr("data-face", null).removeClass("rolling");
  };

  const rollTo = (face) => {
    clearTimeout(timeoutId);

    $("ul > li > a").removeClass("active");
    $(`[href="${face}"]`).addClass("active");

    $die.attr("data-face", face);
  };

  const randomFace = () => {
    const face = Math.floor(Math.random() * sides) + initialSide;
    lastFace = face === lastFace ? randomFace() : face;
    return face;
  };

  const $die = $(".die");
  const sides = 20;
  const initialSide = 1;
  let lastFace;
  let timeoutId;
  const transitionDuration = 500;
  const animationDuration = 3000;

  return (
    <div>
      <div className="content">
        <div className="die">
          {Array.from({ length: 20 }, (_, index) => (
            <figure
              key={index + 1}
              className={`face face-${index + 1} ${
                selectedFace === index + 1 ? "selected" : ""
              }`}
            />
          ))}
        </div>
      </div>
      <Button
        className="randomize"
        onClick={e => {
          e.target.disabled = true;
          handleRollClick(e);
        }}
      >
        Roll!
      </Button>
    </div>
  );
}

export default Dice;
