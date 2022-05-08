import React from "react";
import { useEffect, useState } from "react";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
import { List, Card, Pagination, Button } from "antd";
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
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 6,
          xxl: 3,
        }}
      >
        {episodes?.map((episode) => {
          return (
            <List.Item>
              <Card>
                <Meta title={episode.name} description={episode.episode} />
                <Link to={`/episodes/${episode.id}`}>
                  <Button type="primary">Details</Button>
                </Link>
              </Card>
            </List.Item>
          );
        })}
      </List>
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
