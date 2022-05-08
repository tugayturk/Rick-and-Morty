import { Button, Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";
import {
 ArrowRightOutlined
} from '@ant-design/icons';
function HomePage() {
  const { Footer } = Layout;
  return (
    <div className="homePageContainer">
      <div className="introductionWrapper">
        <div className="introduction">
          <div className="introductionDescription">
            An animated series that follows the exploits of a super scientist
            and his not-so-bright grandson.Created by Dan Harmon & Justin
            Roiland
          </div>
        </div>
      </div>
      <div className="episodeWrapper">
        <div >
        <Link to="/episodes">
          <Button type="primary" shape="round" icon={<ArrowRightOutlined />} size="large" >Go to Episodes Page</Button>
        </Link>
        </div>
      </div>
      <div className="characterWrapper">
      <div >
        <Link to="/characters">
        <Button type="primary" shape="round" icon={<ArrowRightOutlined />} size="large" >Go to Characters Page</Button>
        </Link>
        </div>
      </div>

      <Footer
        style={{
          textAlign: "center",
          backgroundColor: "#001529",
          color: "#F0E3FF",
        }}
      >
        Rick&Morty Created by Tugay Türk
      </Footer>
    </div>
  );
}

export default HomePage;
