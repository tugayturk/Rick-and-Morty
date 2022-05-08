import { Card, Spin, Descriptions } from "antd";
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
        console.log(data);
      });
  }, [characterId]);

  return (
    <div>
      {character ? (
        <div style={{display:"flex",flexDirection:"row"}}>
          <Card
            hoverable
            style={{ width: 480 }}
            cover={<img alt="example" src={character.image} />}
          >
            <Meta title={character.name} />
          </Card>
          <div  style={{width:480,marginLeft:120}}>
            <Descriptions title={character.name} style={{display:"flex",flexDirection:"column"}}>
              <Descriptions.Item label="Gender">
                {character.gender}
              </Descriptions.Item>
              <Descriptions.Item label="Species">
                {character.species}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {character.status}
              </Descriptions.Item>
              {/* <Descriptions.Item label="Remark">empty</Descriptions.Item>
<Descriptions.Item label="Address">
  No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
</Descriptions.Item> */}
            </Descriptions>
          </div>
        </div>
      ) : (
        <Spin tip="Loading..." />
      )}
    </div>
  );
}

export default CharacterDetail;
