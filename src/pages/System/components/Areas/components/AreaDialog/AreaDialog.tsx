import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { POSButton, POSDialog, POSDialogHeader, POSTextField } from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { Area, areaEmpty } from "common/models";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useAreaContext } from "../../context";

export type AreaDialogProps = {};

interface FormValues extends Area {}
const initialValues: FormValues = { ...areaEmpty };

const AreaDialog: React.FC<AreaDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useAreaContext();
  const { post, update, getById } = useAxios(APIControllers.AREAS);

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Area>(values) : await update<Area>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    code: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getArea = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues(response);
    setIdSelected(0);
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }
    if (!idSelected) return;

    getArea(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSTextField keyFormik="code" label="Código" formik={formik} />
          <POSTextField keyFormik="description" label="Descripción" formik={formik} />
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

export default AreaDialog;
