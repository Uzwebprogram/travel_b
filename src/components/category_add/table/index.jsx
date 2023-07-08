import * as React from "react";
import "./styles.css";
import TableCommon from "../../common/table";
import { useSelector } from "react-redux";
import { Image } from 'antd';
import { Popover, Space } from 'antd';



export default function TableAdd({ HandleDelete, onClickPut }) {
  const categoryGetState = useSelector((state) => state.category);
  const rows = categoryGetState.categoryGet?.data;
  const data = [];
  rows.map((elem, index) => {
    data.push({
      data: index + 1,
      Фото: <Image
        width="100px"
        height="100%"
        style={{ aspectRatio: "16 / 9", borderRadius: "20px" }}
        src={elem.image}
      />,
      key: elem.id,
      Имякатегорииузб: elem.title_uz,
      Имякатегориирусский: elem.title_ru,
      Имякатегорииен: elem.title_en,

      Действие: (
        <div className="boxx">
          <div className="btn-wraps">
            <button onClick={onClickPut} id={elem.id}>
              <i class='bx bx-message-square-edit'></i>
            </button>
          </div>

          <Space wrap>
            <Popover
              trigger="click"
              placement="rightBottom"
              content={
                <div className="content_delete_box">
                  <p>Вы уверены, что хотите удалить эту категория?</p>
                  <p>При удалений категорий вся информация принадлежащая <br /> данной категории будут удалены безвозратно</p>
                  <div className="btn_wrap_delete">
                    <button className="no_btn">
                      Нет
                    </button>
                    <button onClick={HandleDelete} id={elem.id} className="yes_btn">
                      да
                    </button>
                  </div>
                </div>
              }
              title={
                <div className="delete_box">
                  <i class='bx bxs-error-circle'></i>
                  <span>Удалите категория <span>{elem.title_ru}</span></span>
                </div>
              }
            >
              <div className="btn-wrap">
                <button id={elem.id}>
                  <i class="bx bxs-trash"></i>
                </button>
              </div>
            </Popover>
          </Space>
        </div>

      ),
    });
  });

  const columns = [
    {
      title: "№",
      dataIndex: "data",
      key: "data",
      width: 50,
      align: "center",
    },
    {
      title: "Фото",
      dataIndex: "Фото",
      key: "Фото",
      align: "center",
    },
    {
      title: "Имя категории узб",
      dataIndex: "Имякатегорииузб",
      key: "Имякатегорииузб",
    },
    {
      title: "Имя категории рус",
      dataIndex: "Имякатегориирусский",
      key: "Имякатегориирусский",
    },
    {
      title: "Имя категории ен",
      dataIndex: "Имякатегорииен",
      key: "Имякатегорииен",

    },
    {
      title: "Действие",
      dataIndex: "Действие",
      key: "Действие",
      fixed: "right",
      align: "center",
    },
  ];



  return (
    <TableCommon
      bordered
      scroll={{
        y: 330,
      }}
      columns={columns}
      data={data}
      pagination={false}
    />
  );
}
