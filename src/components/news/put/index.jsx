import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NewsPut , NewsGet , UploadImage } from "../../../redux/news";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import { Image, Spin } from "antd";
import DraverCommon from "../../common/Drawer";
import { LoadingOutlined } from '@ant-design/icons';
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
  const date = useRef();
  const dataProject = useSelector((state) => state.news?.uploadNews);
  const newsGets = useSelector((state) => state.news.newsGet.data);
  const FilterData = newsGets.filter(elem =>  elem.id == ids)

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
      title_en: titleEn.current.value,
      description_uz: descriptionUz.current.value,
      description_ru: descriptionRu.current.value,
      description_en: descriptionEn.current.value,
      time_date : date.current.value,
      image: !dataProject.data ? FilterData.map(elem => elem.image)[0] : dataProject.data ,
    };
    await dispatch(NewsPut({ body, id: ids }));
    dispatch(NewsGet());
    handleClosePut();
    window.location.reload()
  };
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
    <>
      <DraverCommon title='Изменить блог' open={openPut} onClose={handleClosePut}>
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {
                  newsGets.map(elem =>  elem.id == ids ?
                    <Row className="row">
                    <h4>Добавить фотографию</h4>
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
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: "1 / 1", borderRadius: "20px", zIndex: "99999999" }}
                                src={dataProject.data}
                              />
                            ) : (
                              <Image
                                width="100%"
                                height="100%"
                                style={{ aspectRatio: "1 / 1", borderRadius: "20px", zIndex: "99999999" }}
                                src={elem.image}
                              />
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
                    <input type="date" defaultValue={elem.time_date.slice(0 , 10)}  style={{width: "60%" , marginTop:"10px"}} ref={date} />
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
                    type="text"
                    defaultValue={elem.title_uz}
                    required
                    ref={titleUz}
                  />
                  </div>
                </Col>
                <Col className="col" lg={4}>
                                      <div style={{width:"100%"}}>
                  <h4>*</h4>
                  <input
                    type="text"
                    defaultValue={elem.title_ru}
                    required
                    ref={titleRu}
                  />
                  </div>
                </Col>
                <Col className="col" lg={4}>
                                      <div style={{width:"100%"}}>
                  <h4>*</h4>
                  <input
                    type="text"
                    defaultValue={elem.title_en}
                    required
                    ref={titleEn}
                  />
                  </div>
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
              </Row>
                  :null)
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
