import SaveIcon from "@mui/icons-material/Save";
import { DialogActions, DialogContent } from "@mui/material";
import { Box } from "@mui/system";
import { POSButton, POSDialog, POSDialogHeader, POSSelect, POSTextField } from "common/components";
import { useAxios } from "common/custom-hooks";
import { SelectDTO } from "common/dtos";
import { PurchaseDetail, purchaseDetailEmpty } from "common/models";
import { calculateValues } from "common/utilities";
import { useFormik } from "formik";
import React, { ChangeEvent, useEffect, useState } from "react";
import * as Yup from "yup";
import { usePurchaseDetailContext } from "../../context";

export type PurchaseDetailDialogProps = {};

interface FormValues extends PurchaseDetail {}

const PurchaseDetailDialog: React.FC<PurchaseDetailDialogProps> = () => {
  const {
    isOpenDialog,
    setIsOpenDialog,
    titleDialog,
    setIsGridLoading,
    idSelected,
    setIdSelected,
    purchaseId,
  } = usePurchaseDetailContext();
  const { post, update, getById } = useAxios("PurchaseDetails");
  const { selects } = useAxios();
  const [articles, setArticles] = useState<SelectDTO[]>([]);
  const initialValues: FormValues = { ...purchaseDetailEmpty, purchaseId };

  const handleSubmit = async (values: FormValues) => {
    const response = !values.id
      ? await post<PurchaseDetail>(values)
      : await update<PurchaseDetail>(values);
    if (!response.success) return;

    setIsGridLoading(true);
    setIsOpenDialog(false);
  };

  const validationSchema = Yup.object({
    // code: Yup.string().required("Required"),
    // description: Yup.string().required("Required"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const getPurchaseDetail = async (id: number) => {
    const response = await getById<FormValues>(id, "GetPurchaseDetailById");
    formik.setValues(response);
    setIdSelected(0);
  };

  const getArticles = async () => {
    const response = await selects("GetArticles");
    setArticles(response);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const value = parseFloat(event.target.value === "" ? "0" : event.target.value);
    formik.setValues((prevValues) => ({
      ...prevValues,
      [field]: value,
      ...calculateValues(
        field === "quantitySold" ? value : prevValues.quantitySold,
        field === "price" ? value : prevValues.price
      ),
    }));
  };

  useEffect(() => {
    if (!isOpenDialog) {
      formik.resetForm();
      return;
    }

    getArticles();
    if (!idSelected) return;

    getPurchaseDetail(idSelected);
  }, [isOpenDialog]);

  return (
    <POSDialog open={isOpenDialog}>
      <POSDialogHeader titleDialog={titleDialog} setIsOpenDialog={setIsOpenDialog} />
      <Box component="form" onSubmit={formik.handleSubmit}>
        <DialogContent>
          <POSSelect keyFormik="articleId" label="Artículo" formik={formik} datas={articles} />
          <POSTextField
            keyFormik="quantitySold"
            label="Cantidad vendida"
            formik={formik}
            type="number"
            inputProps={{
              style: { textAlign: "right" },
            }}
            onChange={(event) => handleInputChange(event, "quantitySold")}
          />
          <POSTextField
            keyFormik="price"
            label="Precio"
            formik={formik}
            type="number"
            inputProps={{
              style: { textAlign: "right" },
            }}
            onChange={(event) => handleInputChange(event, "price")}
          />
          <POSTextField
            keyFormik="subtotal"
            label="Subtotal"
            formik={formik}
            type="number"
            inputProps={{
              style: { textAlign: "right" },
            }}
            disabled
          />
          <POSTextField
            keyFormik="taxes"
            label="IVA"
            formik={formik}
            type="number"
            inputProps={{
              style: { textAlign: "right" },
            }}
            disabled
          />
          <POSTextField
            keyFormik="total"
            label="Total"
            formik={formik}
            type="number"
            inputProps={{
              style: { textAlign: "right" },
            }}
            disabled
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

export default PurchaseDetailDialog;
