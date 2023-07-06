import { POSReducer } from "@/redux";
import { parseJwt } from "@/utilities";
import SaveIcon from "@mui/icons-material/Save";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { POSButton, POSDialog, POSDialogHeader, POSSelect } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { PurchaseRequestDTO, SelectDTO, purchaseRequestDTOEmpty } from "common/dtos";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { usePurchasingProcessContext } from "../../context";

export type PurchasingProcessDialogProps = {};

export interface PurchaseDialogProps {}

interface FormValues extends PurchaseRequestDTO {}
const initialValues: FormValues = { ...purchaseRequestDTOEmpty };

const PurchasingProcessDialog: React.FC<PurchasingProcessDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = usePurchasingProcessContext();
  const { token } = useSelector((store: POSReducer) => store.session);
  const { post, update, getById } = useAxios(APIControllers.PURCHASES);
  const { selects } = useAxios();
  const [suppliers, setSuppliers] = useState<SelectDTO[]>([]);
  const [userName, setUserName] = useState<string>("");

  const handleSubmit = async (values: FormValues) => {
    const data = { ...values, userName: userName };
    const response = !values.id
      ? await post<PurchaseRequestDTO>(data)
      : await update<PurchaseRequestDTO>(data);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    supplierId: Yup.number().moreThan(0, "Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getPurchase = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues(response);
    setIdSelected(0);
  };

  const getSuppliers = async () => {
    const response = await selects("GetSuppliers");
    setSuppliers(response);
  };

  useEffect(() => {
    const userClaim = parseJwt(token);
    setUserName(userClaim.FullName);
  }, []);

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }

    getSuppliers();
    if (!idSelected) return;

    getPurchase(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSSelect keyFormik="supplierId" label="Proveedor" formik={formik} datas={suppliers} />
        </DialogContent>
        <DialogActions>
          <POSButton type="submit" disabled={formik.isSubmitting} isLoading={formik.isSubmitting}>
            <SaveIcon /> Guardar
          </POSButton>
        </DialogActions>
      </Box>
    </POSDialog>
  );
};

export default PurchasingProcessDialog;
