import React, { useEffect, useState } from "react";
import HeaderTopCommon from "../../components/common/HeaderTop";
import { WrapperContainer } from "../../style-App";
import { useDispatch } from "react-redux";
import { GetProjects } from "../../redux/projects";
import Sidebar from "../../components/sidebar";
import ProjectsComponent from "../../components/Projects";
import { motion } from "framer-motion";
function Projects() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetProjects());
  }, []);

  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  return (
    <Sidebar>
        <WrapperContainer>
          <HeaderTopCommon
            title={"Изображение"}
            onClick={handleOpen}
            textBtn={"Изображение добавить"}
          />
          <ProjectsComponent handleClose={handleClose} open={open} />
        </WrapperContainer>
    </Sidebar>
  );
}
export default Projects;
