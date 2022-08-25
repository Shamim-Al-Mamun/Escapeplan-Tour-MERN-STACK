import React from "react";
import { Link } from "react-router-dom";

import ColorButton from "./Button";
function Home() {
  return (
    <div className="home w-full">
      <div className="w-full h-3/5 sm:w-3/5 flex items-center justify-center">
        <div className="px-3 sm:pl-12">
          <p className="text-lg text-center text-white text-shadow py-5">
            Travel to the any corner of the world, without going around in
            circles
          </p>
          <p className="text-6xl text-center text-text text-shadow">
            Make Your Tour Amazing With Us
          </p>
          <div className="w-full text-center py-5">
            <Link to="/packages">
              <ColorButton text="Book Now">Book Now </ColorButton>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
