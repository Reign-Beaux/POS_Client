import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import {
  POSButton,
  POSCheckbox,
  POSDialog,
  POSDialogHeader,
  POSSelect,
  POSTextField,
} from "common/components";
import { APIControllers } from "common/consts";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import { Article, articleEmpty } from "common/models";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useArticlesContext } from "../../context";

export type ArticlesDialogProps = {};

interface FormValues extends Article {}
const initialValues: FormValues = { ...articleEmpty };

const ArticlesDialog: React.FC<ArticlesDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
  } = useArticlesContext();
  const { post, update, getById } = useAxios(APIControllers.ARTICLES);
  const { selects } = useAxios();
  const [articleType, setArticleType] = useState<SelectDTO[]>([]);

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id ? await post<Article>(values) : await update<Article>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    articleTypeId: Yup.number().moreThan(0, "Required"),
    code: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getArticle = async (id: number) => {
    const response = await getById<FormValues>(id);
    formik.setValues(response);
    setIdSelected(0);
  };

  const getArticlesTypes = async () => {
    const response = await selects("GetArticlesTypes");
    setArticleType(response);
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }
    getArticlesTypes();
    if (!idSelected) return;

    getArticle(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSSelect
            keyFormik="articleTypeId"
            label="Tipo de articulo"
            formik={formik}
            datas={articleType}
          />
          <POSTextField keyFormik="code" label="Código" formik={formik} />
          <POSTextField keyFormik="description" label="Descripción" formik={formik} />
          <POSCheckbox keyFormik="isActive" label="Activo" formik={formik} />
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

export default ArticlesDialog;
