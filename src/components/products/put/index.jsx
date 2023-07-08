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
  const [destinationUz, setDestinationUz] = useState();
  const [destinationRu, setDestinationRu] = useState();
  const [destinationEn, setDestinationEn] = useState();
  const [colorUz, setColorUz] = useState();
  const [colorRu, setColorRu] = useState();
  const [colorEn, setColorEn] = useState();
  const [mainFabricUz, setMainFabricUz] = useState();
  const [mainFabricRu, setMainFabricRu] = useState();
  const [mainFabricEn, setMainFabricEn] = useState();
  const [compounds, setCompounds] = useState();
  const [storageUz, setStorageUz] = useState();
  const [storageRu, setStorageRu] = useState();
  const [storageEn, setStorageEn] = useState();

  const productPut = useSelector((state) => state.product);
  // product get
  const productGets = useSelector((state) => state.product.productGet.data);
  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const filterData = productGets.filter(elem => elem.id == ids)
  console.log(filterData)
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
      product_type_uz: productTypeUz,
      product_type_ru: productTypeRu,
      product_type_en: productTypeEn,
      contents_uz: contentsUz,
      contents_ru: contentsRu,
      contents_en: contentsEn,
      destination_uz: destinationUz,
      destination_ru: destinationRu,
      destination_en: destinationEn,
      color_uz: colorUz,
      color_ru: colorRu,
      color_en: colorEn,
      main_fabric_uz: mainFabricUz,
      main_fabric_ru: mainFabricRu,
      main_fabric_en: mainFabricEn,
      Compound: compounds,
      storage_uz: storageUz,
      storage_ru: storageRu,
      storage_en: storageEn,
      category: selectId,
      image: dataProject.data
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
                            onChange={(e) => setTitleUz(e.currentTarget.value)}
                          />
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_ru}
                            onChange={(e) => setTitleRU(e.currentTarget.value)}
                          />
                          <InputCommon
                            type="text"
                            defaultValue={elem.title_en}
                            onChange={(e) => setTitleEn(e.currentTarget.value)}
                          />

                          <Row>
                            <Col className="col" lg={12}>
                              <h4>Вид изделия</h4>
                              <InputCommon
                                type="text"
                                defaultValue={elem.product_type_uz}
                                onChange={(e) => setProductTypeUz(e.currentTarget.value)}
                              />
                            </Col>
                            <Col className="col" lg={12}>
                              <InputCommon
                                type="text"
                                defaultValue={elem.product_type_ru}
                                onChange={(e) => setProductTypeRu(e.currentTarget.value)}
                              />
                            </Col>
                            <Col className="col" lg={12}>
                              <InputCommon
                                type="text"
                                defaultValue={elem.product_type_en}
                                onChange={(e) => setProductTypeEn(e.currentTarget.value)}
                              />
                            </Col>
                          </Row>
                        </Col>

                        <Col className="col" lg={4}>
                          <h4>Комплектность</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.contents_uz}
                            onChange={(e) => setContentsUz(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.contents_ru}
                            onChange={(e) => setContentsRu(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.contents_en}
                            onChange={(e) => setContentsEn(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Назначение</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.destination_uz}
                            onChange={(e) => setDestinationUz(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.destination_ru}
                            onChange={(e) => setDestinationRu(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.destination_en}
                            onChange={(e) => setDestinationEn(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Цвет</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.color_uz}
                            onChange={(e) => setColorUz(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.color_ru}
                            onChange={(e) => setColorRu(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.color_en}
                            onChange={(e) => setColorEn(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Основная ткань</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.main_fabric_uz}
                            onChange={(e) => setMainFabricUz(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.main_fabric_ru}
                            onChange={(e) => setMainFabricRu(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.main_fabric_en}
                            onChange={(e) => setMainFabricEn(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={12}>
                          <h4>Состав</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.Compound}
                            onChange={(e) => setCompounds(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>Гарантийный срок</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.storage_uz}
                            onChange={(e) => setStorageUz(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.storage_ru}
                            onChange={(e) => setStorageRu(e.currentTarget.value)}
                          />
                        </Col>
                        <Col className="col" lg={4}>
                          <h4>*</h4>
                          <InputCommon
                            type="text"
                            defaultValue={elem.storage_en}
                            onChange={(e) => setStorageEn(e.currentTarget.value)}
                          />
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
