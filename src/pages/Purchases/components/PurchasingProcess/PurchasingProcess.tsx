import React from 'react';
import { PurchasingProcessProvider } from './context';
import { PurchasingProcessActionButtons, PurchasingProcessDataGrid } from './components';

export type PurchasingProcessProps = {
}

const PurchasingProcess: React.FC<PurchasingProcessProps> = () => {
	return (
		<PurchasingProcessProvider>
			<PurchasingProcessActionButtons />
			<PurchasingProcessDataGrid />
			<PurchasingProcessDataGrid />
		</PurchasingProcessProvider>
	);
};

export default PurchasingProcess;
