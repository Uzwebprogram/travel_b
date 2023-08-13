import React, { useEffect, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useDispatch, useSelector } from "react-redux";
import {
  ProductPost,
  ProductGet,
  UploadImage,
} from "../../../redux/products/index";
import { CategoryGet } from "../../../redux/category/index";
import { Row, Col } from "react-grid-system";
import SelectCommon from "../../common/select/index";
import DrawerCommon from "../../common/Drawer/index";
import InputCommon from "../../common/input/index";
import "./styles.css";
import { Spin, Input, Image } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { Button, message, Steps, theme } from "antd";
import styled from "styled-components";
import ImageUpload from "./upload";

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
    setSelectId(e);
    window.localStorage.setItem("selectId", e);
  };

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
      category: selectId,
      sale_count: salecount,
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
        color: "#000",
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

  // STEPS CODE
  const steps = [
    {
      title: "First",
      content: (
        <>
          <Wrapper onSubmit={HandleSubmit}>
            <div className="input_wrap">
              <div className="scrool">
                <Row className="row">
                  <Col className="col" lg={12}>
                    <ImageUpload />
                  </Col>
                  <Col className="col" lg={6}>
                    <div>
                      <h4>Выбрать компания</h4>
                      <div className="selects">
                        <SelectCommon
                          onChange={SelectChange}
                          placeholder="Выбрать"
                          options={options}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col" lg={6}>
                    <div>
                      <h4>Выбрать категория апарат</h4>
                      <div className="selects">
                        <SelectCommon
                          onChange={SelectChange}
                          placeholder="Выбрать"
                          options={options}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col" lg={6}>
                    <div>
                      <h4>Выбрать партнеры</h4>
                      <div className="selects">
                        <SelectCommon
                          onChange={SelectChange}
                          placeholder="Выбрать"
                          options={options}
                        />
                      </div>
                    </div>
                  </Col>
                  <Col className="col" lg={6}>
                    <h4>PDF-файл</h4>
                    <InputCommon
                      className="file_input"
                      type="file"
                      id="fileupload"
                      required
                      onChange={(e) => setTitleEn(e.currentTarget.value)}
                    />
                  </Col>
                  <Col className="col" lg={4}>
                    <h4>Имя продукта</h4>
                    <InputCommon
                      type="text"
                      placeholder="узбекский"
                      required
                      onChange={(e) => setTitleUz(e.currentTarget.value)}
                    />
                  </Col>
                  <Col className="col" lg={4}>
                    <h4>*</h4>

                    <InputCommon
                      type="text"
                      placeholder="русский"
                      required
                      onChange={(e) => setTitleRU(e.currentTarget.value)}
                    />
                  </Col>
                  <Col className="col" lg={4}>
                    <h4>*</h4>
                    <InputCommon
                      type="text"
                      placeholder="английский"
                      required
                      onChange={(e) => setTitleEn(e.currentTarget.value)}
                    />
                  </Col>
                  <Col className="col" lg={12}>
                    <h4>Oписание</h4>
                    <textarea
                      className="textarea_products"
                      placeholder="узбекский"
                      required
                      onChange={(e) => setProductTypeUz(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>
                  <Col className="col" lg={12}>
                    <textarea
                      className="textarea_products"
                      placeholder="русский"
                      required
                      onChange={(e) => setProductTypeRu(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>
                  <Col className="col" lg={12}>
                    <textarea
                      className="textarea_products"
                      placeholder="английский"
                      required
                      onChange={(e) => setProductTypeEn(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>
                  <Col className="col" lg={12}>
                    <h4>Преимущества</h4>
                    <textarea
                      className="textarea_products"
                      placeholder="печатание"
                      required
                      onChange={(e) => setProductTypeEn(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>

                  {/* <Col className="col" lg={4}>
                    <h4>описание 2</h4>
                    <textarea
                      className="textarea_products"
                      placeholder="узбекский"
                      required
                      onChange={(e) => setContentsUz(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>
                  <Col className="col" lg={4}>
                    <h4>*</h4>
                    <textarea
                      className="textarea_products"
                      placeholder="русский"
                      required
                      onChange={(e) => setContentsRu(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col>
                  <Col className="col" lg={4}>
                    <h4>*</h4>
                    <textarea
                      className="textarea_products"
                      placeholder="английский"
                      required
                      onChange={(e) => setContentsEn(e.currentTarget.value)}
                      rows="10"
                      cols="120"
                    ></textarea>
                  </Col> */}
                  {/* <InputCommon
                    type="number"
                    placeholder="процент скидки"
                    required
                    onChange={(e) => setsalecount(e.currentTarget.value)}
                  /> */}
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
      ),
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Third",
      content: "Third-content",
    },
    {
      title: "Fourth",
      content: "Fourth-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));
  const contentStyle = {
    // lineHeight: "260px",
    // textAlign: "center",
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px dashed ${token.colorBorder}`,
    marginTop: 16,
  };

  // STEPS CODE
  return (
    <DrawerCommon title="Добавить продукт" open={Open} onClose={HandleClose}>
      <>
        <Steps className={styled.stepsss} current={current} items={items} />
        <div className="step_content" style={contentStyle}>
          {steps[current].content}
        </div>
        <div
          style={{
            marginTop: 24,
          }}
        >
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: "0 8px",
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
      </>
    </DrawerCommon>
  );
}

export default ProductAddForm;
