import { useEffect, useState } from "react";

import { Card, Row, Col } from "antd";
import { API_BASE_CHARACTERS } from "../config/EnvironmentConfig";

function CharacterCard(props) {
  const { Meta } = Card;
  let arr = [];
  const [details, SetDetails] = useState();

  useEffect(() => {
    props.characters &&
      props.characters.map((episode) => arr.push(getIdFromUrl(episode)));
    let characterIds = arr.toString();

    let url = `${API_BASE_CHARACTERS}/${characterIds}`;

    if (url !== "https://rickandmortyapi.com/api/character/") {
      fetch(url)
        .then((data) => data.json())
        .then((resp) => {
          SetDetails(resp);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [props]);

  const getIdFromUrl = (characters) => {
    const str = characters.split("/");
    return parseInt(str[str.length - 1]);
  };
  return (
    <div>
         <Row>
      {details &&
        details.map((detail) => {
          return (
            <Col xs={24} sm={24} md={12} lg={8} xl={6}  key={detail.id}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={<img alt={detail.name} src={detail.image} />}
            >
              <Meta title={detail.name} description={detail.status} />
            </Card>
            </Col>
          );
        })}
        </Row>
    </div>
  );
}

export default CharacterCard;
