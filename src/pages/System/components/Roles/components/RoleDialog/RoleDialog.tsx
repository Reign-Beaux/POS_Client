import { POSButton, POSDialog, POSDialogTitle, POSTextField } from "common/components";
import { useAxios } from "common/custom-hooks";
import { Role, roleEmpty } from "common/models";
import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useRoleContext } from "../../context";

export type RoleDialogProps = {};

interface FormValues extends Role {}
const initialValues: FormValues = { ...roleEmpty };

const RoleDialog: React.FC<RoleDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useRoleContext();
  const { post, update, getById } = useAxios("Roles");

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Role>(values) : await update<Role>(values);
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

  const getRole = async (id: number) => {
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

    getRole(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogTitle titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSTextField keyFormik="code" label="Código" formik={formik} />
          <POSTextField keyFormik="description" label="Descripción" formik={formik} />
        </DialogContent>
        <DialogActions>
          <POSButton
            type="submit"
            disabled={formik.isSubmitting}
            isLoading={formik.isSubmitting}
          >
            <SaveIcon /> Guardar
          </POSButton>
        </DialogActions>
      </Box>
    </POSDialog>
  );
};

export default RoleDialog;
