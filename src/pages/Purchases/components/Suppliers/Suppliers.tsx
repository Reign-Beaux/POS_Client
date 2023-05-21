import React from 'react';
import { SupplierProvider } from './context';
import { SupplierActionButtons, SupplierDataGrid, SupplierDialog } from './components';

export type SuppliersProps = {
}

const Suppliers: React.FC<SuppliersProps> = () => {
	return (
		<SupplierProvider>
			<SupplierActionButtons />
			<SupplierDataGrid />
			<SupplierDialog />
		</SupplierProvider>
	);
};

export default Suppliers;
