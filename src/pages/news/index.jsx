import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { NewsGet } from "../../redux/news/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import NewsComponent from "../../components/news";
import Sidebar from "../../components/sidebar";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
function News() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(NewsGet());
  }, []);
  return (


    window.localStorage.getItem("checked") == 'false' ? <HorizontalSidebar>
      <WrapperContainer style={{ marginTop: "112px" }}>
        <HeaderTopCommon
          title={"Новости"}
          onClick={showDrawer}
          textBtn={"Добавить новости"}
        />
        <NewsComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Новости"}
          onClick={showDrawer}
          textBtn={"Добавить новости"}
        />
        <NewsComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </VerticalSidebar>
  );
}
export default News;
