import React from 'react';
import { ArticlesTypesProvider } from './context';
import { ArticlesTypesActionButtons, ArticlesTypesDatagrid, ArticlesTypesDialog } from './components';

export type ArticlesTypesProps = {
}

const ArticlesTypes: React.FC<ArticlesTypesProps> = () => {
	return (
		<ArticlesTypesProvider>
			<ArticlesTypesActionButtons />
			<ArticlesTypesDatagrid />
			<ArticlesTypesDialog />
		</ArticlesTypesProvider>
	);
};

export default ArticlesTypes;
