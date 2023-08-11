import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delete from "./delete";
import CategoryAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
import { AparatDelete, AparatPut } from "../../redux/aparat";
function AparatComponent({ open, handleClose }) {
  const categorydelete = useSelector((state) => state.aparat);
  const dispatch = useDispatch();
  const [categoryId, setCategoryId] = useState();
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setCategoryId(e.target.id);
    setOpenDelete(true);
  };
  const [openPut, setOpenPut] = useState(false);
  const handleClosePut = () => setOpenPut(false);
  const handlePutModal = (e) => {
    setCategoryId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = (e) => {
    dispatch(AparatDelete(e.currentTarget.id));
  };
  if (categorydelete.AparatDelete.Success == true) {
    window.location.reload();
  }
  const HandlePut = () => {
    dispatch(AparatPut(categoryId));
  };
  return (
    <>
      <CategoryAddForm Open={open} HandleClose={handleClose} />
      <TableAdd onClickDelete={handleDeleteModal} HandleDelete={HandleDelete} onClickPut={handlePutModal} />
      <Delete
        // HandleDelete={HandleDelete}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Put
        put_id={categoryId}
        HandlePut={HandlePut}
        openPut={openPut}
        handleClosePut={handleClosePut}
      />
    </>
  );
}

export default AparatComponent;
