import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { POSButton, POSDialog, POSDialogHeader, POSSelect, POSTextField } from "common/components";
import { APIControllers, emailRegex } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import { Supplier, supplierEmpty } from "common/models";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useSupplierContext } from "../../context";

export type SupplierDialogProps = {};

interface FormValues extends Supplier {}
const initialValues: FormValues = { ...supplierEmpty };

const SupplierDialog: React.FC<SupplierDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useSupplierContext();
  const { post, update, getById } = useAxios(APIControllers.SUPPLIERS);
  const { selects } = useAxios();
  const [brands, setBrands] = useState<SelectDTO[]>([]);

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Supplier>(values) : await update<Supplier>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    brandId: Yup.number().moreThan(0, "Required"),
    name: Yup.string().required("Required"),
    paternalSurname: Yup.string().required("Required"),
    maternalSurname: Yup.string().required("Required"),
    rfc: Yup.string().required("Required"),
    phone: Yup.string().required("Required"),
    cellphone: Yup.string().required("Required"),
    email: Yup.string().required("Required").matches(emailRegex, "Invalid email address"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getSupplier = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues(response);
    setIdSelected(0);
  };

  const getBrands = async () => {
    const response = await selects("GetBrands");
    setBrands(response);
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }

    getBrands();
    if (!idSelected) return;

    getSupplier(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSSelect keyFormik="brandId" label="Marcas" formik={formik} datas={brands} />
          <POSTextField keyFormik="name" label="Nombre" formik={formik} />
          <POSTextField keyFormik="paternalSurname" label="Apellido Paterno" formik={formik} />
          <POSTextField keyFormik="maternalSurname" label="Apellido Materno" formik={formik} />
          <POSTextField keyFormik="rfc" label="R.F.C." formik={formik} />
          <POSTextField keyFormik="phone" label="Teléfono" formik={formik} />
          <POSTextField keyFormik="cellphone" label="Celular" formik={formik} />
          <POSTextField keyFormik="email" label="Correo" formik={formik} />
          <POSTextField
            keyFormik="observations"
            label="Observaciones"
            formik={formik}
            multiline
            rows={3}
          />
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

export default SupplierDialog;
