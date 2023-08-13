import React, { useState } from "react";
import { Spin, Input, Image } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { UploadImage } from "../../../../redux/products/index";
import { Col, Row } from "react-grid-system";
import { LoadingOutlined } from "@ant-design/icons";
import "./styles.css";
import { VerticalAlignBottom } from "@mui/icons-material";

const ImageUpload = () => {
  const dispatch = useDispatch();
  const dataProject = useSelector((state) => state.product?.uploadProjects);
  const HandleChange = async (e) => {
    await dispatch(UploadImage(e));
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
  return (
    <>
      <div className="upload_row_wrapp">
        <h4>Добавить фотографию</h4>
        <Row>
          <Col lg={4}>
            <div className="upload_cover">
              {dataProject.Loading == true ? (
                <div className="upload_spinss">
                  <Spin indicator={antIcon} />
                </div>
              ) : dataProject.Success == true ? (
                <Image
                  style={{
                    aspectRatio: "16 / 9",
                    borderRadius: "20px",
                    zIndex: "99999999",
                    verticalAlign: "initial",
                  }}
                  src={dataProject.data}
                />
              ) : (
                <div className="upload_none_img">
                  <>
                    <input type="file" id="file1" onChange={HandleChange} />
                    <label for="file1" class="custom-file-upload">
                      <span className="upload_span-download">
                        <ion-icon name="cloud-download-outline"></ion-icon>
                      </span>
                    </label>
                  </>
                </div>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <div className="upload_cover">
              {dataProject.Loading == true ? (
                <div className="upload_spinss">
                  <Spin indicator={antIcon} />
                </div>
              ) : dataProject.Success == true ? (
                <Image
                  style={{
                    aspectRatio: "16 / 9",
                    borderRadius: "20px",
                    zIndex: "99999999",
                    verticalAlign: "initial",
                  }}
                  src={dataProject.data}
                />
              ) : (
                <div className="upload_none_img">
                  <>
                    <input type="file" id="file2" onChange={HandleChange} />
                    <label for="file2" class="custom-file-upload">
                      <span className="upload_span-download">
                        <ion-icon name="cloud-download-outline"></ion-icon>
                      </span>
                    </label>
                  </>
                </div>
              )}
            </div>
          </Col>
          <Col lg={4}>
            <div className="upload_cover">
              {dataProject.Loading == true ? (
                <div className="upload_spinss">
                  <Spin indicator={antIcon} />
                </div>
              ) : dataProject.Success == true ? (
                <Image
                  style={{
                    aspectRatio: "16 / 9",
                    borderRadius: "20px",
                    zIndex: "99999999",
                    verticalAlign: "initial",
                  }}
                  src={dataProject.data}
                />
              ) : (
                <div className="upload_none_img">
                  <>
                    <input type="file" id="file3" onChange={HandleChange} />
                    <label for="file3" class="custom-file-upload">
                      <span className="upload_span-download">
                        <ion-icon name="cloud-download-outline"></ion-icon>
                      </span>
                    </label>
                  </>
                </div>
              )}
            </div>
          </Col>
          <Col lg={12}>
            <div className="infor_box">
              <p>
                <span>Формат: </span>PNG, JPEG, JPG, SVG. Рекомендуемое
                разрешение <span>1920×1280</span> или <span>1280×768</span>
              </p>
              <p>
                {" "}
                <span>Размер: </span>размер файла не должен превышать 5 MB
              </p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default ImageUpload;
