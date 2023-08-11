import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { Row, Col } from "react-grid-system";
import CommonBtn from "../../common/CommonBtn";
import "./styles.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductPut, ProductGet, UploadImage } from "../../../redux/products";
import { CategoryGet } from "../../../redux/category/index";
import SelectCommon from "../../common/select/index";
import DraverCommon from "../../common/Drawer";
import { Spin, Image } from "antd";
import InputCommon from "../../common/input";
import { LoadingOutlined } from '@ant-design/icons';

function Put({
  openPut,
  handleClosePut,
  put_id,
  setSelectId,
  selectId,
  setLoadings,
}) {
  const ids = put_id;
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

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const filterData = productGets.filter(elem => elem.id == ids)
  // product get
  // category get
  const categoryGets = useSelector((state) => state.category.categoryGet.data);
  const dataProject = useSelector((state) => state.product?.uploadProjects);

  const categoryFilter = categoryGets.filter(elem => elem.id == window.localStorage.getItem('selectId'))
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);
  // category get

  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };
  const FilterData = productGets.filter(elem =>  elem.id == ids)

  const options = [];
  categoryGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );
  const SelectChange = (e) => {
    setSelectId(e)
   
  }
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
      image: !dataProject.data ? FilterData.map(elem => elem.image)[0] : dataProject.data ,
      category : selectId
    };

    await dispatch(ProductPut({ body, id: ids }));
    dispatch(ProductGet());
    handleClosePut();
    // setTimeout(() => {
    //   window.location.reload()
    // }, 1000)
    setLoadings(true);
    window.location.reload();
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
      <DraverCommon title='Изменить продукт' open={openPut} onClose={handleClosePut}>
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                {productGets.map((elem) =>
                  elem.id == ids ? (
                    <>
                      <Row className="row">
                        <Col className="col" lg={4}>
                          <h4>Выбрать категорию</h4>
                          <div className="selects">
                            <SelectCommon
                              defaultValue={selectId}
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
                            defaultValue={elem.title_uz}
                            placeholder="uz"
                            onChange={(e) => setTitleUz(e.currentTarget.value)}
                          />
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_ru}
                            placeholder="ru"
                            onChange={(e) => setTitleRU(e.currentTarget.value)}
                          />
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_en}
                            placeholder="en"
                            onChange={(e) => setTitleEn(e.currentTarget.value)}
                          />

<Row>
                    <Col className="col" lg={12}>
                      <h4>описание</h4>
                  <textarea className="textarea_products" 
                        defaultValue={elem.description_uz}
                        placeholder="узбекский"
                        required
                        onChange={(e) => setProductTypeUz(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                    </Col>
                    <Col className="col" lg={12}>
                       <textarea className="textarea_products" 
                        defaultValue={elem.description_ru}
                        placeholder="русский"
                        required
                        onChange={(e) => setProductTypeRu(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                    </Col>
                    <Col className="col" lg={12}>
                  <textarea className="textarea_products" 
                        defaultValue={elem.description_en}
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
                    defaultValue={elem.description2_uz}
                    required
                    onChange={(e) => setContentsUz(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                  <textarea className="textarea_products" 
                    placeholder="русский"
                    defaultValue={elem.description2_ru}
                    required
                    onChange={(e) => setContentsRu(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                <Col className="col" lg={4}>
                  <h4>*</h4>
                    <textarea className="textarea_products" 
                    placeholder="английский"
                    defaultValue={elem.description2_en}
                    required
                    onChange={(e) => setContentsEn(e.currentTarget.value)}
                    rows="10" cols="120">
                  </textarea>
                </Col>
                      </Row>
                    </>
                  ) : null
                )}

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
