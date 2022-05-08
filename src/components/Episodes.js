import React from "react";
import { useEffect, useState } from "react";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
import { Card, Pagination, Button } from "antd";
import { Link } from "react-router-dom";
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
    <div>
      Episodes
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {episodes?.map((episode) => {
          return (
            <Card style={{ width: 240 }}>
              <Meta title={episode.name} description={episode.episode} />
              <Link to={`/episodes/${episode.id}`}>
                <Button type="primary">Details</Button>
              </Link>
            </Card>
          );
        })}
      </div>
      <Pagination
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
