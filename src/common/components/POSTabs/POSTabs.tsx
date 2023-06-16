import { Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

export interface POSTabsProps {
  /**
   * Valor actual de la pestaña seleccionada.
   */
  value: number;
  
  /**
   * Función para actualizar el valor de la pestaña seleccionada.
   * @param {number} newValue - El nuevo valor de la pestaña seleccionada.
   */
  setValue: (newValue: number) => void;
  
  /**
   * Arreglo de nombres de las pestañas.
   */
  tabsName: string[];
}

/**
 * Componente de pestañas.
 *
 * Representa un conjunto de pestañas que permiten al usuario cambiar entre diferentes secciones de contenido.
 */
const POSTabs: React.FC<POSTabsProps> = ({ value, setValue, tabsName }) => {
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        centered
        textColor="secondary"
        indicatorColor="secondary">
        {tabsName.map((tab, index) => (
          <Tab key={index} id={`${index}`} label={tab} />
        ))}
      </Tabs>
    </Box>
  );
};

export default POSTabs;
