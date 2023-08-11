import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { NewsGet } from "../../redux/news/index";
import { useDispatch } from "react-redux";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
import PeraparatComponent from "../../components/pereparat";
import {  PereparatGet } from "../../redux/pereparat";
function Peraparat() {
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(PereparatGet());
  }, []);
  return (


    window.localStorage.getItem("checked") == 'false' ? <HorizontalSidebar>
      <WrapperContainer style={{ marginTop: "112px" }}>
        <HeaderTopCommon
          title={"перепарат"}
          onClick={showDrawer}
          textBtn={"Добавить перепарат"}
        />
        <PeraparatComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"перепарат"}
          onClick={showDrawer}
          textBtn={"Добавить перепарат"}
        />
        <PeraparatComponent handleClose={onClose} open={open} />
      </WrapperContainer>
    </VerticalSidebar>
  );
}
export default Peraparat;
