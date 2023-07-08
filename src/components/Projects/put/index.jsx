import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProjects, PutProjects, UploadImage } from "../../../redux/projects";
import ModalCommon from "../../common/Modal/Modal";
import { ProductGet } from "../../../redux/products";
import { Wrapper } from "./styled-index";
import SelectCommon from "../../common/select";
import CommonBtn from "../../common/CommonBtn";
import { Spin } from "antd";
import "./styles.css";

function Put({ openPut, handleClosePut, put_id, setSelectId, selectId }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.projects);
  const dataProject = useSelector((state) => state.projects?.uploadProjects);
  const productGets = useSelector((state) => state.product.productGet.data);

  useEffect(() => {
    dispatch(ProductGet());
  }, []);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      image: dataProject.data,
      products: selectId,
    };
    await dispatch(PutProjects({ body, id: put_id }));
    dispatch(GetProjects());
    handleClosePut();
  };

  const options = [];
  productGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );

  return (
    <>
      <ModalCommon width={340} open={openPut} handleClose={handleClosePut}>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изображение изменить</h3>

          <div className="selects">
            <SelectCommon
              onChange={(e) => setSelectId(e)}
              placeholder="Select"
              options={options}
            />
          </div>
          {dataProject.Loading == true ? (
            <div className="spins">
              <Spin size="large" />
            </div>
          ) : (
            <>
              <input type="file" id="file" onChange={HandleChange} />
              <label for="file" class="custom-file-upload">
                <span className="span-download">
                  <ion-icon name="cloud-download-outline"></ion-icon>
                </span>
              </label>
            </>
          )}

          {data.getProjects?.Data.map((elem) =>
            elem.id == put_id ? (
              <>
                <CommonBtn
                  type={"submit"}
                  style={{
                    margin: "20px auto 0 auto",
                    padding: "12px 40px",
                    border: "2px solid #fff",
                  }}
                >
                  Изменить
                </CommonBtn>
              </>
            ) : null
          )}
        </Wrapper>
      </ModalCommon>
    </>
  );
}
export default Put;
