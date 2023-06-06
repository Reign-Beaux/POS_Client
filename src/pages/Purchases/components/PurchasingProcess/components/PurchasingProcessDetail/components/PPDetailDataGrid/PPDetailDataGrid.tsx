import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid, POSSelectToDataGrid } from "common/components";
import { Taxes } from "common/consts";
import { useAxios, useDialogConfirm } from "common/custom-hooks";
import { PurchaseDTO, SelectDTO } from "common/dtos";
import { PurchaseDetail } from "common/models";
import React, { ChangeEvent, useEffect, useState } from "react";
import { usePPDetailContext } from "../../context";

export type PPDetailDataGridProps = {};

const PPDetailDataGrid: React.FC<PPDetailDataGridProps> = () => {
  const { purchaseDetail, setPurchaseDetail } = usePPDetailContext();
  const { getAll, remove, selects } = useAxios("Purchases");
  const { showDialogConfirm, resetResponse, response } = useDialogConfirm();
  const [Purchases, setPurchases] = useState<PurchaseDTO[]>([]);
  const [articles, setArticles] = useState<SelectDTO[]>([]);

  const handleChangeArticle = (event: SelectChangeEvent<unknown>, detail: PurchaseDetail) => {
    const currentDetail = { ...detail, articleId: parseInt(event.target.value as string) };
    const index = purchaseDetail.findIndex((x) => x.record === detail.record);
    let newPurchaseDetail = [...purchaseDetail];
    newPurchaseDetail[index] = currentDetail;
    setPurchaseDetail(newPurchaseDetail);
  };

  const handleChangeQuantitySold = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    detail: PurchaseDetail
  ) => {
    const quantitySold = parseFloat(event.target.value === "" ? "0" : event.target.value);
    const subtotal = quantitySold * detail.price;
    const iva = subtotal * Taxes.IVA;
    const total = subtotal + iva;

    const currentDetail = {
      ...detail,
      quantitySold: quantitySold,
      subtotal: subtotal,
      taxes: iva,
      total: total,
    };
    const index = purchaseDetail.findIndex((x) => x.record === detail.record);
    let newPurchaseDetail = [...purchaseDetail];
    newPurchaseDetail[index] = currentDetail;
    setPurchaseDetail(newPurchaseDetail);
  };

  const handleChangePrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    detail: PurchaseDetail
  ) => {
    const price = parseFloat(event.target.value === "" ? "0" : event.target.value);
    const subtotal = detail.quantitySold * price;
    const iva = subtotal * Taxes.IVA;
    const total = subtotal + iva;

    const currentDetail = {
      ...detail,
      price: price,
      subtotal: subtotal,
      taxes: iva,
      total: total,
    };
    const index = purchaseDetail.findIndex((x) => x.record === detail.record);
    let newPurchaseDetail = [...purchaseDetail];
    newPurchaseDetail[index] = currentDetail;
    setPurchaseDetail(newPurchaseDetail);
  };

  const handleRemove = (record: number) => {
    const index = purchaseDetail.findIndex((x) => x.record === record);
    let newPurchaseDetail = [...purchaseDetail];
    newPurchaseDetail.splice(index, 1);
    newPurchaseDetail
      .sort((a, b) => a.record - b.record)
      .forEach((x, index) => (x.record = index + 1));
    setPurchaseDetail(newPurchaseDetail);
  };

  const getArticles = async () => {
    const result = await selects("GetArticles");
    const defaultSelect: SelectDTO[] = [{ value: 0, text: "Seleccionar artículo" }];
    setArticles([...defaultSelect, ...result]);
  };

  const columns: GridColDef[] = [
    {
      field: "record",
      headerName: "#",
      flex: 1,
      maxWidth: 80,
      editable: false,
      align: "right",
    },
    {
      field: "articleId",
      headerName: "Artículo",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <POSSelectToDataGrid
          key={"articleId"}
          datas={articles}
          value={params.row.articleId}
          onChange={(event) => handleChangeArticle(event, params.row)}
        />
      ),
    },
    {
      field: "quantitySold",
      headerName: "Cantidad",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <TextField
          key={"quantitySold"}
          value={params.row.quantitySold}
          onChange={(event) => handleChangeQuantitySold(event, params.row)}
          variant="standard"
          type="number"
          fullWidth
          // InputProps={{
          //   endAdornment: (
          //     <InputAdornment position="end" style={{ marginBottom: "10px" }}>
          //       <IconButton
          //         aria-label="toggle password visibility"
          //         // onClick={handleClickShowPassword}
          //         edge="end">
          //         <CloseIcon />
          //       </IconButton>
          //     </InputAdornment>
          //   ),
          // }}
        />
      ),
    },
    {
      field: "price",
      headerName: "Precio",
      flex: 1,
      minWidth: 150,
      editable: false,
      renderCell: (params: GridRenderCellParams) => (
        <TextField
          key={"price"}
          value={params.row.price}
          onChange={(event) => handleChangePrice(event, params.row)}
          variant="standard"
          type="number"
          fullWidth
        />
      ),
    },
    {
      field: "subtotal",
      headerName: "Subtotal",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "right",
    },
    {
      field: "taxes",
      headerName: "IVA",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "right",
    },
    {
      field: "total",
      headerName: "Total",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "right",
    },
    {
      field: "actions",
      headerName: "",
      flex: 1,
      minWidth: 150,
      editable: false,
      align: "center",
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: GridRenderCellParams) => (
        <Tooltip title="Eliminar compra">
          <IconButton aria-label="delete-subject" onClick={() => handleRemove(params.row.record)}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    getArticles();
  }, []);

  return <POSDataGrid dataSource={purchaseDetail} columns={columns} />;
};

export default PPDetailDataGrid;
