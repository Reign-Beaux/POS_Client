import {
  POSButton,
  POSCheckbox,
  POSDialog,
  POSDialogTitle,
  POSSelect,
  POSTextField,
} from "@/common/components";
import { useAxios } from "@/common/custom-hooks";
import { Article, articleEmpty } from "@/common/models";
import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { SelectDTO } from "../../../../../../common/dtos/selectDTO";
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
  const { post, update, getById } = useAxios("Articles");
  const { getAll } = useAxios("Selects");
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
    const response = await getAll<SelectDTO>("GetArticlesTypes");
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
    <POSDialog isOpen={isOpenDialog}>
      <POSDialogTitle titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
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
