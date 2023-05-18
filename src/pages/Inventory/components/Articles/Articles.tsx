import React from 'react';
import { ArticlesProvider } from './context';
import { ArticlesActionButtons, ArticlesDataGrid, ArticlesDialog } from './components';

export type ArticlesProps = {
}

const Articles: React.FC<ArticlesProps> = () => {
	return (
		<ArticlesProvider>
			<ArticlesActionButtons />
			<ArticlesDataGrid />
			<ArticlesDialog />
		</ArticlesProvider>
	);
};

export default Articles;
