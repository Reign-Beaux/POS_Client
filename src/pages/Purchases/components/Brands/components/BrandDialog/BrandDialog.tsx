import { POSButton, POSDialog, POSDialogTitle, POSTextField } from "common/components";
import { useAxios } from "common/custom-hooks";
import { Brand, brandEmpty } from "common/models";
import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useBrandContext } from "../../context";

export type BrandDialogProps = {};

interface FormValues extends Brand {}
const initialValues: FormValues = { ...brandEmpty };

const BrandDialog: React.FC<BrandDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useBrandContext();
  const { post, update, getById } = useAxios("Brands");

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Brand>(values) : await update<Brand>(values);
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

  const getBrand = async (id: number) => {
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

    getBrand(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog isOpen={isOpenDialog}>
      <POSDialogTitle titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
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

export default BrandDialog;
