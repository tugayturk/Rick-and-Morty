import { Button } from "antd";
import React from "react";
import { useEffect } from "react";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
import "./HomePage.css";
function HomePage() {
  useEffect(() => {
    fetch(API_BASE_EPISODES)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }, []);

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
        <Button type="primary">Go to Episodes Page</Button>
      </div>
      <div className="characterWrapper">
        Characters
        <Button type="primary">Go to Characters Page</Button>
      </div>
    </div>
  );
}

export default HomePage;
