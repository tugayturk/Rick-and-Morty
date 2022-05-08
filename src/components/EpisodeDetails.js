import { Card, List } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  API_BASE_CHARACTERS,
  API_BASE_EPISODES,
} from "../config/EnvironmentConfig";

function EpisodeDetails() {
  const { Meta } = Card;

  const { episodeId } = useParams();
  const [episodeDetail, SetEpisodeDetail] = useState();
  const [characters, SetCharacters] = useState();
  const [details, SetDetails] = useState();
  let arr = [];
  useEffect(() => {
    fetch(`${API_BASE_EPISODES}/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        SetCharacters(data.characters);
        SetEpisodeDetail(data);
      characters &&  characters.map((episode) => arr.push(getIdFromUrl(episode)));
      let characterIds = arr.toString();
      let url = `${API_BASE_CHARACTERS}/${characterIds}`;
      fetch(url)
        .then((data) => data.json())
        .then((resp) => {
          console.log(resp)
          SetDetails(resp);
        });
      });
      
  },[]);



  const getIdFromUrl = (characters) => {
    const str = characters.split("/");
    return parseInt(str[str.length - 1]);
  };

 
//console.log(details)
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
            <Card>
              <Meta
                title={episodeDetail.name}
                description={episodeDetail.episode}
              />
            </Card>
          </List.Item>
        </List>
      )}


{/* {characterDetails ? characterDetails?.map((characters) => {
          return (
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={characters.name} src={characters.image} />}
            >
              <Meta title={characters.name} description={characters.status} />
            </Card>
          );  
        }) : <a>span</a> } */}
    </div>
  );
}

export default EpisodeDetails;
