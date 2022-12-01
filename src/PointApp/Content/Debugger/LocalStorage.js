import React from 'react';

import {
	DebugButton,
	DebugFooter,
	DebugHeader,
	DebugTable,
} from './DebugUtils';


const LS = window.localStorage;

const getRowsFromLS = (LOGX) => {
	const rows = [...Object.keys(LS)].map(key => ({
		key: key,
		length: LS.getItem(key).length
	}));
	return rows;
};

export default function LocalStorage ({LOGX}) {
	const [rows, setRows] = React.useState(getRowsFromLS(LOGX));

	const deleteItem = (key) => {
		LS.removeItem(key);
		LOGX.deletedFrom('LocalStorage', key);
		setRows(getRowsFromLS(LOGX));
	};

	const LocalStorageRow = ({k, row}) => {
		return (
			<tr>
				<td>{k+1}</td>
				<td className="text-blue-600">{row.key}</td>
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
