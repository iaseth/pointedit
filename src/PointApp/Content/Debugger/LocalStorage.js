import React from 'react';

import {Button} from '../../Utils';


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

	return (
		<div>
			<header className="text-center py-3">
				<h4>LocalStorage</h4>
			</header>

			<table className="w-full">
				<tbody>
					{rows.map((row, k) => <tr key={k}>
						<td>{k+1}</td>
						<td className="text-green-600">{row.key}</td>
						<td>{row.length}</td>
						<td>
							<Button onClick={() => deleteItem(row.key)}>Delete</Button>
						</td>
					</tr>)}
				</tbody>
			</table>

			<footer className="text-center py-4">
				<h5 className="text-slate-500">LocalStorage has <span className="bg-green-500 text-white px-2 py-1 rounded">{rows.length}</span> items</h5>
			</footer>
		</div>
	);
}
