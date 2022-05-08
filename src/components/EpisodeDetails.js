import { Card } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_BASE_EPISODES } from "../config/EnvironmentConfig";
function EpisodeDetails() {
  const { episodeId } = useParams();
  const [episodeDetail, SetEpisodeDetail] = useState();
  const [characters,SetCharacters] = useState()
  useEffect(() => {
    fetch(`${API_BASE_EPISODES}/${episodeId}`)
      .then((response) => response.json())
      .then((data) => {
        SetCharacters(data.characters);
        SetEpisodeDetail(data);
      });
  }, []);
  //console.log(episodeDetail)

  const getIdFromUrl = (characters) => {
    const str = characters.split("/");
    return parseInt(str[str.length - 1]);
  };

  return (
    <div className="site-card-border-less-wrapper">
     {episodeDetail && <Card title={episodeDetail?.name} bordered={false} style={{ width: 300 }}>
        <p>Date : {episodeDetail.air_date}</p>
        <p>Episode : {episodeDetail.episode}</p>
        {characters?.map((episode) => (      
           <p>{getIdFromUrl(episode)}</p>
        ))}
      </Card>}
    </div>
  );
}

export default EpisodeDetails;
