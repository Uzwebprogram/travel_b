import React, { useRef, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import { useDispatch } from "react-redux";
import { NewsPost, NewsGet, UploadImage } from "../../../redux/news/index";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Spin } from "antd";
import "./styles.css";
import DraverCommon from "../../common/Drawer";

function NewsForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const descriptionUz = useRef()
  const descriptionRu = useRef()
  const descriptionEn = useRef()
  const links = useRef()
  const categoryAdd = useSelector((state) => state.category);
  const dataProject = useSelector((state) => state.news?.uploadNews);
  useEffect(() => {
    dispatch(NewsGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      NewsPost({
        title_uz: titleUz.current.value,
        title_ru: titleRu.current.value,
        title_en: titleRu.current.value,
        description_uz: descriptionUz.current.value,
        description_ru: descriptionRu.current.value,
        description_en: descriptionEn.current.value,
        link: links.current.value,
      })
    );
    dispatch(NewsGet());
    HandleClose();
  };

  return (
    <DraverCommon title='Добавить блог' open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={3}>
                  <h4>Тема</h4>
                  <input
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={titleUz}
                  />
                </Col>
                <Col className="col" lg={3}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="русский"
                    required
                    ref={titleRu}
                  />
                </Col>
                <Col className="col" lg={3}>
                  <h4>*</h4>
                  <input
                    type="text"
                    placeholder="английский"
                    required
                    ref={titleEn}
                  />
                </Col>
                <Col className="col" lg={12}>
                  <h4>Описание узбекский</h4>
                  <textarea required
                    ref={descriptionUz}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={12}>
                  <h4>Описание русский</h4>
                  <textarea required
                    ref={descriptionRu}
                    rows="10" cols="120">
                  </textarea>

                </Col>
                <Col className="col" lg={12}>
                  <h4>Описание английский</h4>
                  <textarea required
                    ref={descriptionEn}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={6}>
                  <input
                    type="url"
                    placeholder="Ссылка https://example.com"
                    required
                    ref={links}
                  />
                </Col>


              </Row>
              <CommonBtn
                type="submit"
                style={{
                  margin: "20px auto 0 auto",
                  padding: "12px 40px",
                  border: "2px solid #fff",
                }}
              >
                Добавить
              </CommonBtn>
            </div>
          </div>
        </Wrapper>
      </>
    </DraverCommon>
  );
}

export default NewsForm;
