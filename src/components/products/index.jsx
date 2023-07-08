import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  ProductDelete,
  ProductPut,
  ProductGet,
} from "../../redux/products/index";
import Delete from "./delete";
import ProductAddForm from "./post";
import Put from "./put";
import TableAdd from "./table";
function ProductsComponent({ open, handleClose }) {
  const dispatch = useDispatch();
  const [selectId, setSelectId] = useState(null);
  const [productId, setProductId] = useState();
  const [loadings, setLoadings] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const handleCloseDelete = () => setOpenDelete(false);
  const handleDeleteModal = (e) => {
    setProductId(e.currentTarget.id);
    setOpenDelete(true);
  };

  useEffect(() => {
    dispatch(ProductGet());
  }, []);

  const [openPut, setOpenPut] = useState(false);
  const onClosePut = () => {
    setOpenPut(false);
  };
  const handlePutModal = (e) => {
    setProductId(e.currentTarget.id);
    setOpenPut(true);
  };
  const HandleDelete = async () => {
    await dispatch(ProductDelete(productId));
    dispatch(ProductGet());
    setLoadings(true);
  };

  return (
    <>
      <ProductAddForm
        setSelectId={setSelectId}
        selectId={selectId}
        Open={open}
        HandleClose={handleClose}
        setLoadings={setLoadings}
      />
      <TableAdd
        HandleDelete={HandleDelete}
        loadings={loadings}
        onClickPut={handlePutModal}
        setLoadings={setLoadings}
        selectId={selectId}
      />
      <Delete
        productId={productId}
        openDelete={openDelete}
        handleCloseDelete={handleCloseDelete}
      />
      <Put
        setLoadings={setLoadings}
        setSelectId={setSelectId}
        selectId={selectId}
        put_id={productId}
        openPut={openPut}
        handleClosePut={onClosePut}
      />
    </>
  );
}

export default ProductsComponent;
