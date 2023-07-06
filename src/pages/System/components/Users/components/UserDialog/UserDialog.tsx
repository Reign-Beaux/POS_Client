import SaveIcon from "@mui/icons-material/Save";
import { Box, DialogActions, DialogContent } from "@mui/material";
import {
  POSButton,
  POSDialog,
  POSDialogHeader,
  POSPassField,
  POSSelect,
  POSTextField
} from "common/components";
import { APIControllers, emailRegex } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import { User, userEmpty } from "common/models";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useUserContext } from "../../context";

export type UserDialogProps = {};

interface FormValues extends User {
  passwordConfirm: string;
}
const initialValues: FormValues = { ...userEmpty, passwordConfirm: "" };

const UserDialog: React.FC<UserDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useUserContext();
  const { post, update, getById } = useAxios(APIControllers.USERS);
  const { selects } = useAxios();
  const [employees, setEmployees] = useState<SelectDTO[]>([]);
  const [roles, setRoles] = useState<SelectDTO[]>([]);
  const [isOpening, setIsOpening] = useState<boolean>(true);

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<User>(values) : await update<User>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string()
      .nullable()
      .test({
        name: "password-validator",
        exclusive: false,
        message: "Required",
        test: function (value) {
          if (isOpening) {
            setIsOpening(false);
            return true;
          }
          
          if (!formik.values.id && !value) return false;

          return true;
        },
      }),
    passwordConfirm: Yup.string().test({
      name: "password-match",
      exclusive: false,
      message: "Passwords must match",
      test: function (value) {
        const password = this.parent.password;

        return value === password;
      },
    }),
    employeeId: Yup.number().moreThan(0, "Required"),
    roleId: Yup.number().moreThan(0, "Required"),
    email: Yup.string().required("Required").matches(emailRegex, "Invalid email address"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getUser = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues({ ...response, ...{ passwordConfirm: "" } });
    formik.isValid = true;
    setIdSelected(0);
  };

  const getEmployees = async () => {
    const response = await selects("GetEmployees");
    setEmployees(response);
  };

  const getRoles = async () => {
    const response = await selects("GetRoles");
    setRoles(response);
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      setIsOpening(true);
      return;
    }
    getEmployees();
    getRoles();
    formik.setTouched({passwordConfirm: true});
    if (!idSelected) return;

    getUser(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSTextField keyFormik="username" label="Nombre de usuario" formik={formik} />
          <POSPassField keyFormik="password" label="Contraseña" formik={formik} />
          <POSPassField keyFormik="passwordConfirm" label="Confirmar Contraseña" formik={formik} />
          <POSSelect keyFormik="employeeId" label="Empleado" formik={formik} datas={employees} />
          <POSSelect keyFormik="roleId" label="Rol" formik={formik} datas={roles} />
          <POSTextField keyFormik="email" label="Correo electrónico" formik={formik} />
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

export default UserDialog;
