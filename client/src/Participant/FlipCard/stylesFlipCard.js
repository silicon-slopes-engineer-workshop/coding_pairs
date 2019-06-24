import styled from "styled-components";

export const FlipCard = styled.div`
  display: inline-block;
  
  .scene {
    height: 330px;
    width: 300px
    perspective: 0px;
    margin: 10px .9vw 0 .9vw
  }
  .card {
    position: relative;
    transition: transform 1s;
    transform-style: preserve-3d;
    cursor: pointer;
    height: 100%;
    width: 100%;
  }
  .card_face {
    position: absolute;
    width: 100%;
    height: 100%
    backface-visibility: hidden;
  }

  .card.flipped {
    transform: rotateY(180deg);
  }

  .front {
    background: white;
    transform: translateZ(10px);
    border: #ed3800 3px solid;
    padding: 10px
  }

  .back {
    font-size: .75rem;
    padding: 5px;
    background: #f3a546;
    overflow: auto;
    color: white;
    transform: rotateY(180deg);
    border: #ed3800 3px solid;
  }
`;

export const Button = styled.button`
  height: 5vh;
  width: 90%;
  border-radius: 5px;
  background: green;
`;
