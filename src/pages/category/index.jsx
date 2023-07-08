import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { CategoryGet } from "../../redux/category/index";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import CategoryAddComponent from "../../components/category_add";
import Sidebar from "../../components/sidebar";
import { motion } from "framer-motion";
import HorizontalSidebar from "../../components/horizontal-sidebar";
import VerticalSidebar from "../../components/vertical-sidebar";
function Category() {
  const categoryGetState = useSelector((state) => state.category);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(CategoryGet());
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    window.localStorage.getItem("checked") == 'false' ? <HorizontalSidebar>
      <WrapperContainer style={{ marginTop: "112px" }}>
        <HeaderTopCommon
          title={"Категория"}
          onClick={handleOpen}
          textBtn={"Добавить категорию"}
        />
        <CategoryAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>

    </HorizontalSidebar> : <VerticalSidebar>
      <WrapperContainer>
        <HeaderTopCommon
          title={"Категория"}
          onClick={handleOpen}
          textBtn={"Добавить категорию"}
        />
        <CategoryAddComponent handleClose={handleClose} open={open} />
      </WrapperContainer>

    </VerticalSidebar>
  );
}
export default Category;
