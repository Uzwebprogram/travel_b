import * as React from "react";
import { ProductGet } from "../../../redux/products/index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Image } from "antd";
import { useState } from "react";
import "./styles.css";
import { Skeleton } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Avatar, Card } from "antd";

export default function TableAdd({ onClickDelete, onClickPut, selectId }) {
  const { Meta } = Card;
  const [visible, setVisible] = useState(false);
  const ClientCommentGetState = useSelector(
    (state) => state.projects.getProjects?.Data
  );
  const productGetState = useSelector(
    (state) => state.product.productGet?.data
  );
  console.log(productGetState.map((elem) => elem));
  const fliterData = ClientCommentGetState.filter(
    (elem) => elem.product == selectId
  );
  console.log(fliterData);
  const HeaderRows = [
    {
      id: 1,
      title: "Картинка",
    },
  ];
  return (
 

    <>
      <div className="card_wrapper">
        <Row className="row">
          {ClientCommentGetState.map((elem) => (
            <Col className="col" lg={3}>
              <div className="card_wrap">
                <Card
                  style={{
                    width: "100%",
                    boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.05)",
                  }}
                  cover={
                    <>
                      <Image
                        style={{
                          width: "100%",
                          height: "150px",
                          objectFit: "cover",
                        }}
                        src={elem.image}
                      />
                    </>
                  }
                  actions={[
                    <EditOutlined
                      onClick={onClickPut}
                      id={elem.id}
                      key="edit"
                    />,
                    <DeleteOutlined
                      onClick={onClickDelete}
                      id={elem.id}
                      key="delete"
                    />,
                  ]}
                >
                  <Meta title={elem.products.title_ru} />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
}
