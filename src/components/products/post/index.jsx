import React, { useEffect, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import { ProductPost, ProductGet, UploadImage } from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import DrawerCommon from '../../common/Drawer/index'
import InputCommon from '../../common/input/index'
import "./styles.css";
import { Spin, Input, Image } from "antd";
import { LoadingOutlined } from '@ant-design/icons';

function ProductAddForm({ Open, HandleClose, setSelectId, selectId }) {

  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRU] = useState();
  const [titleEn, setTitleEn] = useState();
  const [productTypeUz, setProductTypeUz] = useState();
  const [productTypeRu, setProductTypeRu] = useState();
  const [productTypeEn, setProductTypeEn] = useState();
  const [contentsUz, setContentsUz] = useState();
  const [contentsRu, setContentsRu] = useState();
  const [contentsEn, setContentsEn] = useState();
  const [salecount, setsalecount] = useState();



  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);

  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  const dataProject = useSelector((state) => state.product?.uploadProjects);

  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };

  // window.localStorage.setItem('categoryId', selectId)

  const SelectChange = (e) => {
    setSelectId(e)
    window.localStorage.setItem('selectId', e)
  }

  // product post
  const productPost = useSelector((state) => state.product);
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz,
      title_ru: titleRu,
      title_en: titleEn,
      description_uz: productTypeUz,
      description_ru: productTypeRu,
      description_en: productTypeEn,
      description2_uz: contentsUz,
      description2_ru: contentsRu,
      description2_en: contentsEn,
      image: dataProject.data,
      category : selectId,
      sale_count : salecount
    };
    console.log(body);
    await dispatch(ProductPost(body));
    dispatch(ProductGet());
    HandleClose();
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

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  // product post
  return (
    <DrawerCommon title='Добавить продукт' open={Open} onClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                <Col className="col" lg={4}>
                  <h4>Выбрать категорию</h4>
                  <div className="selects">
                    <SelectCommon
                      onChange={SelectChange}
                      placeholder="Выбрать"
                      options={options}
                    />
                  </div>
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
                              style={{ aspectRatio: "1 / 1", borderRadius: "20px", zIndex: "99999999" }}
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
                                <span>Загрузить фото</span>
                              </span>
                            </label>
                          </>
                        )
                      }
                    </Col>
                    <Col lg={12}>
                      <div className="infor_box">
                        <p><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1080×1080</span></p>
                        <p> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col className="col" lg={8}>
                  <h4>Имя продукта</h4>
                  <InputCommon
                    type="text"
                    placeholder="узбекский"
                    required
                    onChange={(e) => setTitleUz(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="русский"
                    required
                    onChange={(e) => setTitleRU(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="английский"
                    required
                    onChange={(e) => setTitleEn(e.currentTarget.value)}
                  />

                  <Row>
                    <Col className="col" lg={12}>
                      <h4>описание</h4>
                  <textarea className="textarea_products" 
                        placeholder="узбекский"
                        required
                        onChange={(e) => setProductTypeUz(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                    </Col>
                    <Col className="col" lg={12}>
                       <textarea className="textarea_products" 
                        placeholder="русский"
                        required
                        onChange={(e) => setProductTypeRu(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                    </Col>
                    <Col className="col" lg={12}>
                  <textarea className="textarea_products" 
                        placeholder="английский"
                        required
                        onChange={(e) => setProductTypeEn(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                    </Col>
                  </Row>
                </Col>

                <Col className="col" lg={4}>
                  <h4>описание 2</h4>
                  <textarea className="textarea_products" 
                    placeholder="узбекский"
                    required
                    onChange={(e) => setContentsUz(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <textarea className="textarea_products" 
                    placeholder="русский"
                    required
                    onChange={(e) => setContentsRu(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                    <textarea className="textarea_products" 
                    placeholder="английский"
                    required
                    onChange={(e) => setContentsEn(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <InputCommon
                    type="number"
                    placeholder="процент скидки"
                    required
                    onChange={(e) => setsalecount(e.currentTarget.value)}
                  />
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
    </DrawerCommon>

  );
}

export default ProductAddForm;
