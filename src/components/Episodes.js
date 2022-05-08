import React from "react";
import { useEffect, useState } from "react";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
import { Card, Pagination, Button, Row, Col, Divider, Badge } from "antd";
import { Link } from "react-router-dom";
import "./Episode.css";

function Episodes() {
  const { Meta } = Card;
  const [episodes, SetEpisodes] = useState();
  const [episodeNumber, SetEpisodeNumber] = useState();

  useEffect(() => {
    fetch(API_BASE_EPISODES)
      .then((response) => response.json())
      .then((data) => {
        SetEpisodeNumber(data.info.count);
        SetEpisodes(data.results);
      });
  }, []);

  function onPageChange(page) {
    fetch(`${API_BASE_EPISODES}/?page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        SetEpisodeNumber(data.info.count);
        SetEpisodes(data.results);
      });
  }
  return (
    <div className="episodeContainer">
      <h1 className="episodeTitle"> Episodes</h1>
      <Row>
        <div  style={{ display: "flex", flexWrap: "wrap" }}>
          {episodes?.map((episode) => {
            return (
              <Col xs={24} sm={24} md={12} lg={8} xl={6}  key={episode.id}>
                <Badge.Ribbon text={episode.episode} color="cyan">
                  <Card
                    cover={
                      <img
                        alt="example"
                        src={
                          "https://m.media-amazon.com/images/M/MV5BZjRjOTFkOTktZWUzMi00YzMyLThkMmYtMjEwNmQyNzliYTNmXkEyXkFqcGdeQXVyNzQ1ODk3MTQ@._V1_.jpg"
                        }
                      />
                    }
                    style={{
                      width: 360,
                      marginBottom: "1vw",
                      marginLeft: "1vw",
                    }}
                  >
                     <div className="episodeCards">
                    <Meta title={episode.name} className="episodeCards" />
                   
                    <Link to={`/episodes/${episode.id}`}>
                      <Button  type="primary">Details</Button>
                    </Link>
                    </div>
                  </Card>
                </Badge.Ribbon>
                <Divider />
              </Col>
            );
          })}
        </div>
      </Row>
      <Pagination
      className="pagination"
       style={{ float: "right", marginRight: "1vw" }}
        onChange={onPageChange}
        defaultCurrent={2}
        total={episodeNumber}
        showSizeChanger={false}
        showTotal={(total) => `Total ${total} episodes`}
        defaultPageSize={20}
      />
    </div>
  );
}

export default Episodes;
