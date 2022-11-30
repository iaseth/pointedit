import React from 'react';

import {
	DebugButton,
	DebugFooter,
	DebugHeader,
	DebugTable,
} from './DebugUtils';


const LS = window.localStorage;

const getRowsFromLS = () => {
	const rows = [...Object.keys(LS)].map(key => ({
		key: key,
		length: LS.getItem(key).length
	}));
	console.log(`Returned rows: '${rows.length} rows'`);
	return rows;
};

export default function LocalStorage () {
	const [rows, setRows] = React.useState(getRowsFromLS());

	const deleteItem = (key) => {
		LS.removeItem(key);
		console.log(`Deleted from LocalStorage: '${key}'`);
		setRows(getRowsFromLS());
	};

	const LocalStorageRow = ({k, row}) => {
		return (
			<tr>
				<td>{k+1}</td>
				<td className="text-green-600">{row.key}</td>
				<td>{row.length}</td>
				<td>
					<DebugButton onClick={() => deleteItem(row.key)}>Delete</DebugButton>
				</td>
			</tr>
		);
	};

	return (
		<div>
			<DebugHeader text="LocalStorage" />

			<main>
				<DebugTable headings={["", "Key", "Length", "Actions"]} rows={rows} RowComponent={LocalStorageRow} />
			</main>

			<DebugFooter count={rows.length} what="items" />
		</div>
	);
}
