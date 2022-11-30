


function DefaultRowComponent ({k, row}) {
	return (
		<tr>
			<td>{k+1}</td>
			{row.map((td, k) => <td key={k}>{td}</td>)}
		</tr>
	);
}

export function DebugTable ({
	headings=null, rows=[], RowComponent=DefaultRowComponent
}) {
	return (
		<table className="w-full">
			{headings && <thead>
				<tr>
					{headings.map((h, k) => <td key={k}>{h}</td>)}
				</tr>
			</thead>}

			<tbody>
				{rows.map((row, k) => <RowComponent key={k} {...{k, row}} />)}
			</tbody>
		</table>
	);
}
