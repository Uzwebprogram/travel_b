import ModalCommon from "../../common/Modal/Modal";
import { Wrapper } from "./styled-index";
import { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonBtn from "../../common/CommonBtn";
import { Row, Col } from "react-grid-system";
import InputCommon from "../../common/input";
import { LoadingOutlined } from '@ant-design/icons';
import './styles.css'
import { CompanyGet } from "../../../redux/company";
import SelectCommon from "../../common/select";
import { AparatGet, AparatPut } from "../../../redux/aparat";

function Put({ openPut, handleClosePut, HandlePut, put_id }) {
  const ids = put_id;
  const dispatch = useDispatch();
  const [titleUz, setTitleUz] = useState();
  const [titleRu, setTitleRu] = useState();
  const [titleEn, setTitleEn] = useState();
  const [companyCategory, setCompanyCategory] = useState()

  const categoryGets = useSelector((state) => state.aparat.AparatGet.data);
  const Company = useSelector((state) => state.company.CompanyGet.data);
  const option = []
    Company.map(elem => option.push({value : elem.id , label : elem.name}))
  useEffect(() => {
    dispatch(AparatGet());
    dispatch(CompanyGet())

  }, []);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title_uz: titleUz,
      title_ru: titleRu,
      title_en: titleEn,
      company : companyCategory
    };
    await dispatch(AparatPut({ body, id: ids }));
    dispatch(AparatGet());
    handleClosePut();
    window.location.reload()  
  };
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
      }}
      spin
    />
  );
  return (
    <>
      <ModalCommon width={500} open={openPut} handleClose={handleClosePut}>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изменение категории</h3>
          <div className="input_wrap">
            <div className="scrool">
              <Row className="row">
                {
                  categoryGets.map(elem => elem.id == put_id ? (
                    <>

                      {/* <Col className="col" lg={6}>

                        {
                          dataProject.Success == true ? (
                            <Image
                              width="100%"
                              style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                              src={dataProject.data}
                            />
                          ) : (
                            <Image
                              width="100%"
                              style={{ aspectRatio: "16 / 9", borderRadius: "20px", zIndex: "99999999" }}
                              src={elem.image}
                            />
                          )
                        }
                        <div className="infor_box">
                          <p><span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое разрешение <span>1920×1080</span> или <span>1280×720</span></p>
                          <p> <span>Размер: </span>размер файла не должен превышать 5 MB</p>
                        </div>
                      </Col> */}
                      <Col className="col" lg={12}>
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_uz}
                          onChange={(e) => setTitleUz(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_ru}
                          onChange={(e) => setTitleRu(e.currentTarget.value)}
                        />
                        <InputCommon
                          type="text"
                          defaultValue={elem.title_en}
                          onChange={(e) => setTitleEn(e.currentTarget.value)}
                        />
                          <SelectCommon 
                            defaultValue={elem.company.name}
                            options={option}
                            onChange={e => setCompanyCategory(e)}
                            />
                        <CommonBtn
                          type="submit"
                          style={{
                            margin: "20px auto 0 auto",
                            padding: "12px 40px",
                            border: "2px solid #fff",
                            background: "#03544c",
                          }}
                        >
                          Добавить
                        </CommonBtn>
                      </Col>
                    </>
                  ) : null)
                }
              </Row>
            </div>
          </div>

          {/* <CommonBtn type={"submit"} style={{ marginTop: "20px" }}>
            Изменение
          </CommonBtn> */}
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
