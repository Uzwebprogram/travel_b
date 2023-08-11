import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { NewsGet } from "../../redux/news/index";
import { useDispatch } from "react-redux";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
import BlogComponent from "../../components/blog";
function Blog() {
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
          title={"блог"}
          onClick={showDrawer}
          textBtn={"Добавить блог"}
        />
        <BlogComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"блог"}
          onClick={showDrawer}
          textBtn={"Добавить блог"}
        />
        <BlogComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </VerticalSidebar>
  );
}
export default Blog;
