import React from 'react';
import { BrandProvider } from './context';
import { BrandActionButtons, BrandDataGrid, BrandDialog } from './components';

export type BrandsProps = {
}

const Brands: React.FC<BrandsProps> = () => {
	return (
		<BrandProvider>
			<BrandActionButtons />
			<BrandDataGrid />
			<BrandDialog />
		</BrandProvider>
	);
};

export default Brands;
