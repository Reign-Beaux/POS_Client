import React from 'react';

export type POSTabPanelProps = {
  /**
   * Contenido del panel de pestaña.
   */
  children?: React.ReactNode;
  
  /**
   * El índice del panel.
   */
  index: number;
  
  /**
   * El valor actual del componente de pestañas.
   */
  value: number;
}

/**
 * Panel de pestaña para un componente de pestañas.
 *
 * Representa un panel de contenido para un componente de pestañas.
 * Se utiliza en conjunto con un componente de pestañas para mostrar el contenido correspondiente a una pestaña específica.
 * El panel se muestra solo cuando el valor actual coincide con el índice del panel.
 */
const POSTabPanel: React.FC<POSTabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default POSTabPanel;
