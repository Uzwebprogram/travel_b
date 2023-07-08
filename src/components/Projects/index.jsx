import { useState } from "react";
import { useDispatch } from "react-redux";
import { DeleteProjects, GetProjects } from "../../redux/projects";
import Delete from "./delete";
import ProjectAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
function ProjectsComponent({ open, handleClose }) {
  const dispatch = useDispatch();
  const [imageId, setImageId] = useState();
  const [selectId, setSelectId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setImageId(e.currentTarget.id);
    setOpenDelete(true);
  };

  const [openPut, setOpenPut] = useState(false);
  const handleClosePut = () => setOpenPut(false);
  const handlePutModal = (e) => {
    setImageId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = async () => {
    await dispatch(DeleteProjects(imageId));
    dispatch(GetProjects());
    handleCloseDelete();
  };
  return (
    <>
      <ProjectAddForm
        Open={open}
        HandleClose={handleClose}
        setSelectId={setSelectId}
        selectId={selectId}
      />
      <TableAdd
        onClickDelete={handleDeleteModal}
        onClickPut={handlePutModal}
        selectId={selectId}
      />
      <Delete
        HandleDelete={HandleDelete}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Put
        put_id={imageId}
        openPut={openPut}
        setSelectId={setSelectId}
        selectId={selectId}
        handleClosePut={handleClosePut}
      />
    </>
  );
}

export default ProjectsComponent;
