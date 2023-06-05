import { SelectDTO } from '@/common/dtos';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';
import React from 'react';

export interface POSSelectToDataGridProps extends SelectProps {
	placeholder: string;
	datas: SelectDTO[];
}

const POSSelectToDataGrid: React.FC<POSSelectToDataGridProps> = ({placeholder, datas, ...rest}) => {
	return (
		<FormControl id="pos-form-select-datagrid" fullWidth>
			<InputLabel id="select-label">{placeholder}</InputLabel>
			<Select
				labelId="select-label"
				variant="standard"
				fullWidth
				{...rest}
			>
				{datas.map((data) => (
					<MenuItem key={data.value} value={data.value}>
						{data.text}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	);
};

export default POSSelectToDataGrid;
