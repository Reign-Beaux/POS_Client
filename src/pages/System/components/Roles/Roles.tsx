import React from 'react';
import { RoleProvider } from './context';
import { RoleActionButtons, RoleDataGrid, RoleDialog } from './components';

export interface RolesProps {
}

const Roles: React.FC<RolesProps> = () => {
	return (
		<RoleProvider>
			<RoleActionButtons />
			<RoleDataGrid />
			<RoleDialog />
		</RoleProvider>
	);
};

export default Roles;
