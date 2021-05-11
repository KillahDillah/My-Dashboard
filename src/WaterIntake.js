import { useState } from "react";

//image of empty glass
//animation to fill glass when clicked
//state the reset after midnight

function addWater() {
  console.log("+1");
}

function WaterIntake() {
  return (
    <section id="waterIntake">
      <section className="card">
        <div className="card-body">
          <h5 className="card-title">Water Intake</h5>
          <p>&#128167;</p>
          <button onClick={addWater}>+</button>
        </div>
      </section>
    </section>
  );
}
export default WaterIntake;
