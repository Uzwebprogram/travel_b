import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Delete from "./delete";
import CategoryAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
import { PereparatDelete, PereparatPut } from "../../redux/pereparat";
function PereparatComponent({ open, handleClose }) {
  const categorydelete = useSelector((state) => state.pereparat);
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
    dispatch(PereparatDelete(e.currentTarget.id));
  };
  if (categorydelete.PereparatDelete.Success == true) {
    window.location.reload();
  }
  const HandlePut = () => {
    dispatch(PereparatPut(categoryId));
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

export default PereparatComponent;
