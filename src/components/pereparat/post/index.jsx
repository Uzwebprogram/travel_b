import React, { useRef, useEffect, useState } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { useDispatch } from "react-redux";
import { CategoryAdd, CategoryGet, UploadCategoryImage } from "../../../redux/category";
import { Wrapper } from "./styled-index";
import { useSelector } from "react-redux";
import { Row, Col } from "react-grid-system";
import { Spin, Input, Image } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import InputCommon from "../../common/input";
import "./styles.css";
import SelectCommon from "../../common/select";
import { CompanyGet } from "../../../redux/company";
import { PereparatGet, PereparatPost } from "../../../redux/pereparat";

function CategoryAddForm({ Open, HandleClose }) {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "#fff"
      }}
      spin
    />
  );
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();
  const [companyCategory, setCompanyCategory] = useState()
  const Company = useSelector((state) => state.company.CompanyGet.data);
    const option = []
      Company.map(elem => option.push({value : elem.id , label : elem.name}))
  useEffect(() => {
    dispatch(PereparatGet());
    dispatch(CompanyGet())
  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      PereparatPost({
        title_uz: titleUz,
        title_ru: titleRu,
        title_en: titleEn,
        company : companyCategory
      })
    );
    dispatch(CategoryGet());
    HandleClose();
  };

  
  return (
    <ModalCommon width={400} open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Добавить категорию</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">

                <Col className="col" lg={12}>
                  <InputCommon
                    type="text"
                    placeholder="Категория узб..."
                    required
                    onChange={(e) => setTitleUz(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="Категория русский..."
                    required
                    onChange={(e) => setTitleRu(e.currentTarget.value)}
                  />
                  <InputCommon
                    type="text"
                    placeholder="Категория ен..."
                    required
                    onChange={(e) => setTitleEn(e.currentTarget.value)}
                  />
                  <SelectCommon 
                  defaultValue={"выбрать компанию"}
                  options={option}
                  onChange={e => setCompanyCategory(e)}
                  />

                  <CommonBtn
                    type="submit"
                    style={{
                      margin: "20px auto 0 auto",
                      padding: "12px 40px",
                      border: "2px solid #fff",
                      background: "#03544c"
                    }}
                  >
                    Добавить
                  </CommonBtn>
                </Col>

              </Row>

            </div>
          </div>
        </Wrapper>
      </>
    </ModalCommon>
  );
}

export default CategoryAddForm;
