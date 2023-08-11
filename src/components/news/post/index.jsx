import React, { useRef, useEffect, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import { useDispatch } from "react-redux";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Spin, Input, Image, DatePicker } from "antd";
import "./styles.css";
import DraverCommon from "../../common/Drawer";
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { NewsGet, NewsPost , UploadImage } from "../../../redux/news";
function UslugyForm({ Open, HandleClose }) {
  const dispatch = useDispatch();
  const titleUz = useRef();
  const titleRu = useRef();
  const titleEn = useRef();
  const descriptionUz = useRef()
  const descriptionRu = useRef()
  const [date , setData] = useState()
  const descriptionEn = useRef()
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
        title_en: titleEn.current.value,
        description_uz: descriptionUz.current.value,
        description_ru: descriptionRu.current.value,
        description_en: descriptionEn.current.value,
        image : dataProject.data,
        time_date : date
      })
    );
    dispatch(NewsGet());
    HandleClose();
    window.location.reload();
  };
  const dateFormat = 'YYYY/MM/DD';
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#000"
      }}
      spin
    />
  );
  return (
    <DraverCommon title='Добавить блог' open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                  <Row className="row">
                    <Col className="col_upload" lg={6}>
                      {
                        dataProject.Loading == true ? (
                          <div className="spinss">
                            <Spin indicator={antIcon} />
                          </div>
                        ) : (
                          dataProject.Success == true ? (
                            <Image
                              style={{ aspectRatio: "1 / 1", borderRadius: "20px", width : 350, height:300, zIndex: "99999999" }}
                              src={dataProject.data}
                            />
                          ) : (
                            <div className="none_img">
                              <i class='bx bxs-image'></i>
                            </div>
                          )
                        )
                      }
                    </Col>
                    <Col className="col_upload" lg={6}>
                      {
                        dataProject.Loading == true ? (
                          <div className="spins">
                            <Spin indicator={antIcon} />
                          </div>
                        ) : (
                          <>

                            <input type="file" id="file" onChange={HandleChange} />
                            <label for="file" class="custom-file-upload">
                              <span className="span-download">
                                <ion-icon name="cloud-download-outline"></ion-icon>
                                <h3>Загрузить фото</h3>
                              </span>
                            </label>
                          </>
                        )
                      }
                      <h4 style={{marginTop:"30px"}}>дата новостей</h4>
                    <input type="date" style={{width: "60%" , marginTop:"10px"}} onChange={e => setData(e.target.value)} />

                    </Col>
                    <Col lg={12}>
                      <div className="infor_box">
                        <p><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1080×1080</span></p>
                        <p> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                      </div>
                    </Col>
                  </Row>
                        
                <Col className="col" lg={4}>
                      <div style={{width:"100%"}}>
                  <h4>Тема</h4>
                  <input
                    style={{width:"90%"}}
                    type="text"
                    placeholder="узбекский"
                    required
                    ref={titleUz}
                  />
                      </div>
                </Col>
                        
                <Col className="col" lg={4}>
                      <div style={{width:"100%"}}>
                  <h4>*</h4>
                  <input
                    style={{width:"90%"}}
                    type="text"
                    placeholder="русский"
                    required
                    ref={titleRu}
                  />
                      </div>
                </Col>
                        
                <Col className="col" lg={4}>
                      <div style={{width:"100%"}}>
                  <h4>*</h4>
                  <input
                    style={{width:"90%"}}
                    type="text"
                    placeholder="английский"
                    required
                    ref={titleEn}
                  />
                      </div>
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

export default UslugyForm;
