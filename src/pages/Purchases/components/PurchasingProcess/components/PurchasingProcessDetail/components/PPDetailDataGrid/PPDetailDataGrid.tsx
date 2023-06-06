import { calculateValues } from "@/common/utilities";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, SelectChangeEvent, TextField, Tooltip } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { POSDataGrid, POSSelectToDataGrid } from "common/components";
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
    const newArticleId = parseInt(event.target.value as string);
    const newPurchaseDetail = purchaseDetail.map((purchase) => {
      if (purchase.record === detail.record) return { ...purchase, articleId: newArticleId };

      return purchase;
    });
    setPurchaseDetail(newPurchaseDetail);
  };

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    detail: PurchaseDetail,
    field: string
  ) => {
    const value = parseFloat(event.target.value === "" ? "0" : event.target.value);
    const { quantitySold, price } = detail;

    const updatedDetail = {
      ...detail,
      [field]: value,
      ...calculateValues(
        field === "quantitySold" ? value : quantitySold,
        field === "price" ? value : price
      ),
    };

    const index = purchaseDetail.findIndex((x) => x.record === detail.record);
    const newPurchaseDetail = [...purchaseDetail];
    newPurchaseDetail[index] = updatedDetail;
    setPurchaseDetail(newPurchaseDetail);
  };

  const handleChangeQuantitySold = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    detail: PurchaseDetail
  ) => handleInputChange(event, detail, "quantitySold");

  const handleChangePrice = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    detail: PurchaseDetail
  ) => handleInputChange(event, detail, "price");

  const handleRemove = (record: number) => {
    const newPurchaseDetail = purchaseDetail
      .filter((x) => x.record !== record)
      .map((x, index) => ({ ...x, record: index + 1 }));

    setPurchaseDetail([...newPurchaseDetail]);
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
