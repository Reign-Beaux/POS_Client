import React from 'react';
import { UserProvider } from './context';
import { UserActionButtons, UserDataGrid, UserDialog } from './components';

export interface UsersProps {
}

const Users: React.FC<UsersProps> = () => {
	return (
		<UserProvider>
			<UserActionButtons />
			<UserDataGrid />
			<UserDialog />
		</UserProvider>
	);
};

export default Users;
