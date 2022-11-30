import React from 'react';



function DefaultRowComponent ({k, row}) {
	return (
		<tr>
			<td>{k+1}</td>
			{row.map((td, k) => <td key={k}>{td}</td>)}
		</tr>
	);
}

export function DebugTable ({
	headings=null, rows=[], RowComponent=DefaultRowComponent,
	nRows=5
}) {
	const [n, setN] = React.useState(nRows);
	const onHeaderClick = () => {
		setN((n === nRows) ? rows.length : nRows);
	};

	return (
		<table className="w-full">
			{headings && <thead>
				<tr onClick={onHeaderClick} className="cursor-pointer select-none">
					{headings.map((h, k) => <td key={k}>{h}</td>)}
				</tr>
			</thead>}

			<tbody>
				{rows.slice(0, n).map((row, k) => <RowComponent key={k} {...{k, row}} />)}
			</tbody>
		</table>
	);
}
