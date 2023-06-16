import {
  Button,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { SelectDTO } from "common/dtos";
import React, { useState } from "react";

export type POSTransferListProps = {
  /**
   * Elementos en la lista izquierda.
   */
  left: readonly SelectDTO[];
  
  /**
   * Función para establecer los elementos en la lista izquierda.
   */
  setLeft: Function;
  
  /**
   * Elementos en la lista derecha.
   */
  right: readonly SelectDTO[];
  
  /**
   * Función para establecer los elementos en la lista derecha.
   */
  setRight: Function;
};

// Obtiene los elementos que no estan en la lista `a`.
const not = (a: readonly SelectDTO[], b: readonly SelectDTO[]) =>
  a.filter((value) => !b.some((item) => item.value === value.value));

// Obtiene los elementos comunes entre las listas `a` y `b`.
const intersection = (a: readonly SelectDTO[], b: readonly SelectDTO[]) =>
  a.filter((value) => b.some((item) => item.value === value.value));

// Combina los elementos de las listas `a` y `b` sin duplicados.
const union = (a: readonly SelectDTO[], b: readonly SelectDTO[]) => [...a, ...not(b, a)];

/**
 * Componente de lista de transferencia.
 *
 * Representa una lista de transferencia que permite mover elementos entre dos listas.
 */
const POSTransferList: React.FC<POSTransferListProps> = ({ left, setLeft, right, setRight }) => {
  const [checked, setChecked] = useState<readonly SelectDTO[]>([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (record: SelectDTO) => () => {
    const currentIndex = checked.findIndex((item: SelectDTO) => item.value === record.value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(record);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const numberOfChecked = (items: readonly SelectDTO[]) => intersection(checked, items).length;

  const handleToggleAll = (items: readonly SelectDTO[]) => () => {
    if (numberOfChecked(items) === items.length) {
      setChecked(not(checked, items));
    } else {
      setChecked(union(checked, items));
    }
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const customList = (title: React.ReactNode, items: readonly SelectDTO[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={numberOfChecked(items) === items.length && items.length !== 0}
            indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} seleccionados`}
      />
      <Divider />
      <List
        sx={{
          width: 200,
          height: 230,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list">
        {items.map((item: SelectDTO) => {
          const labelId = `transfer-list-all-item-${item.value}-label`;

          return (
            <ListItem
              key={item.value}
              role="listitem"
              onClick={handleToggle(item)}
              sx={{ cursor: "pointer" }}>
              <ListItemIcon>
                <Checkbox
                  checked={
                    checked.findIndex((check: SelectDTO) => check.value === item.value) !== -1
                  }
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.text} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList("No asignados", left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          {/* <Tooltip title="Asignar funcionalidades"> */}
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right">
            &gt;
          </Button>
          {/* </Tooltip>
          <Tooltip title="Desasignar funcionalidades"> */}
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left">
            &lt;
          </Button>
          {/* </Tooltip> */}
        </Grid>
      </Grid>
      <Grid item>{customList("Asignados", right)}</Grid>
    </Grid>
  );
};

export default POSTransferList;
