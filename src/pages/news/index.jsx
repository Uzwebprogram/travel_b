import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { useDispatch } from "react-redux";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
import NewsComponent from "../../components/news";
import { NewsGet } from "../../redux/news";
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
          title={"новости"}
          onClick={showDrawer}
          textBtn={"Добавить новости"}
        />
        <NewsComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"новости"}
          onClick={showDrawer}
          textBtn={"Добавить новости"}
        />
        <NewsComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </VerticalSidebar>
  );
}
export default News;
