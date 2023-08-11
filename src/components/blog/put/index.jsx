import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsPut, NewsGet, UploadImage } from "../../../redux/news/index";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Spin } from "antd";
import DraverCommon from "../../common/Drawer";
import './styles.css'

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const descriptionUz = useRef()
  const descriptionRu = useRef()
  const descriptionEn = useRef()
  const links = useRef()

  const dataProject = useSelector((state) => state.news?.uploadNews);
  const newsGets = useSelector((state) => state.news.newsGet.data);

  useEffect(() => {
    dispatch(NewsGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz.current.value,
      title_ru: titleRu.current.value,
      title_en: titleRu.current.value,
      description_uz: descriptionUz.current.value,
      description_ru: descriptionRu.current.value,
      description_en: descriptionEn.current.value,
      link: links.current.value,
    };
    await dispatch(NewsPut({ body, id: ids }));
    dispatch(NewsGet());
    handleClosePut();
  };
 
  return (
    <>
      <DraverCommon title='Изменить блог' open={openPut} onClose={handleClosePut}>
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {
                  newsGets.map(elem => (
                    <Row className="row">

                      <Col className="col" lg={3}>
                        <h4>Тема</h4>
                        <input
                          type="text"
                          defaultValue={elem.title_uz}
                          required
                          ref={titleUz}
                        />
                      </Col>
                      <Col className="col" lg={3}>
                        <h4>*</h4>
                        <input
                          type="text"
                          defaultValue={elem.title_ru}
                          required
                          ref={titleRu}
                        />
                      </Col>
                      <Col className="col" lg={3}>
                        <h4>*</h4>
                        <input
                          type="text"
                          defaultValue={elem.title_en}
                          required
                          ref={titleEn}
                        />
                      </Col>
                      <Col className="col" lg={12}>
                        <h4>Описание узбекский</h4>
                        <textarea required
                          ref={descriptionUz}
                          defaultValue={elem.description_uz}
                          rows="10" cols="120">
                        </textarea>
                      </Col>
                      <Col className="col" lg={12}>
                        <h4>Описание русский</h4>
                        <textarea required
                          ref={descriptionRu}
                          defaultValue={elem.description_ru}
                          rows="10" cols="120">
                        </textarea>

                      </Col>
                      <Col className="col" lg={12}>
                        <h4>Описание английский</h4>
                        <textarea required
                          ref={descriptionEn}
                          defaultValue={elem.description_en}
                          rows="10" cols="120">
                        </textarea>
                      </Col>
                      <Col className="col" lg={6}>
                        <input
                          type="url"
                          defaultValue={elem.link}
                          required
                          ref={links}
                        />
                      </Col>


                    </Row>
                  ))
                }

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
    </>
  );
}
export default Put;
