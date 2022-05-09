import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
import CharacterCard from "./CharacterCard";

function EpisodeDetails() {
  const { Meta } = Card;
  const { episodeId } = useParams();
  const [episodeDetail, SetEpisodeDetail] = useState();
  const [characters, SetCharacters] = useState();

  useEffect(() => {
    fetch(`${API_BASE_EPISODES}/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        SetCharacters(data.characters);
        SetEpisodeDetail(data);
      });
  }, []);
  return (
    <div className="site-card-border-less-wrapper">
      {episodeDetail && (
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
          <List.Item>
            <Card
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: "#F0F2F5",
              }}
            >
              <Meta
                title={episodeDetail.name}
                description={episodeDetail.episode}
              />
            </Card>
          </List.Item>
        </List>
      )}

      <h3 style={{ display: "flex", justifyContent: "center" }}>
        Episodes of Characters
      </h3>
      <CharacterCard characters={characters} />
    </div>
  );
}

export default EpisodeDetails;
