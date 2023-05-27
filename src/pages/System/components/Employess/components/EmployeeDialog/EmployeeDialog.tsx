import SaveIcon from "@mui/icons-material/Save";
import { Box, DialogActions, DialogContent } from "@mui/material";
import { POSButton, POSDialog, POSDialogHeader, POSSelect, POSTextField } from "common/components";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import { Employee, employeeEmpty } from "common/models";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useEmployeesContext } from "../../context";

export interface EmployeeDialogProps {}

interface FormValues extends Employee {}
const initialValues: FormValues = { ...employeeEmpty };

const EmployeeDialog: React.FC<EmployeeDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useEmployeesContext();
  const { post, update, getById } = useAxios("Employees");
  const { getAll } = useAxios("Selects");
  const [areas, setAreas] = useState<SelectDTO[]>([]);

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Employee>(values) : await update<Employee>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    areaId: Yup.number().moreThan(0, "Required"),
    name: Yup.string().required("Required"),
    paternalSurname: Yup.string().required("Required"),
    maternalSurname: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getEmployee = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues(response);
    setIdSelected(0);
  };

  const getAreas = async () => {
    const response = await getAll<SelectDTO>("GetAreas");
    setAreas(response);
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }

    getAreas();
    if (!idSelected) return;

    getEmployee(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSTextField keyFormik="name" label="Nombre" formik={formik} />
          <POSTextField keyFormik="paternalSurname" label="Apellido Paterno" formik={formik} />
          <POSTextField keyFormik="maternalSurname" label="Apellido Materno" formik={formik} />
          <POSSelect keyFormik="areaId" label="Área" formik={formik} datas={areas} />
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

export default EmployeeDialog;
