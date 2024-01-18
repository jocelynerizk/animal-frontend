import React from 'react';
import thehero from "../../images/thehero.jpg";

const Herosection = () => {
  return (
    <div className="firstcontainer">
      <img className="thebig" alt="thebig" src={thehero} />
      <p className="blueText">
      Cold Chain Management: Excellence that Makes a Difference. <br />
      Together, Let's Preserve Freshness for a Safer and Healthier World.
      </p>
    </div>
  );
};

export default Herosection;
