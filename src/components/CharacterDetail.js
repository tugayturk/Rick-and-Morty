import { Card, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { API_BASE_CHARACTERS } from "../config/EnvironmentConfig";

function CharacterDetail() {
  const { characterId } = useParams();
  const { Meta } = Card;
  const [character, SetCharacter] = useState();

  useEffect(() => {
    fetch(`${API_BASE_CHARACTERS}/${characterId}`)
      .then((response) => response.json())
      .then((data) => {
        SetCharacter(data);
      
      });
  },[characterId]);

  return (
    <div>
      {character ? 
        <Card
          hoverable
          style={{ width:480 }}
          cover={
            <img
              alt="example"
              src={character.image}
            />
          }
        >
          <Meta title={character.name} description={character.status} />
         </Card> :  <Spin tip="Loading..."/>
      }
    </div>
  );
}

export default CharacterDetail;
