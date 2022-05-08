import { Button } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
function HomePage() {
 

  return (
    <div className="homePageContainer">
      <div className="introductionWrapper">
        <h1>
          An animated series that follows the exploits of a super scientist and
          his not-so-bright grandson.Created by Dan Harmon & Justin Roiland
        </h1>
      </div>
      <div className="episodeWrapper">
        Episodes
        <Link to="/episodes">
        <Button type="primary">Go to Episodes Page</Button>
        </Link>
      </div>
      <div className="characterWrapper">
        Characters
        <Link to="/characters">
        <Button type="primary">Go to Characters Page</Button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
