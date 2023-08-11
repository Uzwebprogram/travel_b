import * as React from "react";
import "./styles.css";
import TableCommon from "../../common/table";
import { useSelector } from "react-redux";
import { Image } from 'antd';
import { Popover, Space } from 'antd';



export default function TableAdd({ HandleDelete, onClickPut }) {
  const newsGetState = useSelector((state) => state.news);
  const rows = newsGetState.newsGet?.data;
  const data = [];
  rows.map((elem, index) => {
    data.push({
      data: index + 1,
      key: elem.id,
      Темаузб: elem.title_uz,
      Темарусский: elem.title_ru,
      Темаен: elem.title_en,
      Описаниеuz: elem.description_uz,
      Описаниеru: elem.description_ru,
      Описаниеen: elem.description_en,
      Ссылка: elem.link,
      Фото: <Image
        width={120}
        height={100}
        src={elem.image}
      />,
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
                  <p>Вы уверены, что хотите удалить эту блог?</p>
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
                  <span>Удалите блог <span>{elem.title_ru}</span></span>
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
      title: "Тема узб",
      dataIndex: "Темаузб",
      key: "Темаузб",
      width : 100
    },
    {
      title: "Тема рус",
      dataIndex: "Темарусский",
      key: "Темарусский",
    },
    {
      title: "Тема ен",
      dataIndex: "Темаен",
      key: "Темаен",
    },
    {
      title: "Описаниеuz",
      dataIndex: "Описаниеuz",
      key: "Описаниеuz",
      width : 120

    },
    {
      title: "Описаниеru",
      dataIndex: "Описаниеru",
      key: "Описаниеru",
      width : 120

    },
    {
      title: "Описаниеen",
      dataIndex: "Описаниеen",
      key: "Описаниеen",
      width : 120

    },
    {
      title: "Ссылка",
      dataIndex: "Ссылка",
      key: "Ссылка"
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
