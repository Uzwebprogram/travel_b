import React, { useRef, useState, useEffect } from "react";
import CommonBtn from "../../common/CommonBtn";
import ModalCommon from "../../common/Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import SelectCommon from "../../common/select";
import { Wrapper } from "./styled-index";
import { Spin } from "antd";
import "./styles.css";

import {
  GetProjects,
  PostProjects,
  UploadImage,
} from "../../../redux/projects";
import { ProductGet } from "../../../redux/products/index";

function ProjectAddForm({ Open, HandleClose, setSelectId, selectId }) {
  // const [selectId, setSelectId] = useState(null);
  const dispatch = useDispatch();
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
    await dispatch(PostProjects(body));
    dispatch(GetProjects());
    HandleClose();
  };

  const options = [];
  productGets.map((elem) =>
    options.push({
      value: elem.id,
      label: elem.title_ru,
    })
  );

  return (
    <ModalCommon open={Open} handleClose={HandleClose}>
      <>
        <Wrapper onSubmit={HandleSubmit}>
          <h3>Изображение добавить</h3>

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

          <CommonBtn
            type={"submit"}
            style={{
              margin: "20px auto 0 auto",
              padding: "12px 40px",
              border: "2px solid #fff",
            }}
          >
            Добавить
          </CommonBtn>
        </Wrapper>
      </>
    </ModalCommon>
  );
}

export default ProjectAddForm;
