


export function DebugHeader ({text}) {
	return (
		<header className="text-center py-4">
			<h4>{text}</h4>
		</header>
	);
}

function DefaultRow ({k, row}) {
	return (
		<tr>
			<td>{k+1}</td>
			{row.map((td, k) => <td key={k}>{td}</td>)}
		</tr>
	);
}

export function DebugTable ({
	headings=null, rows=[], Row=DefaultRow
}) {
	return (
		<table className="w-full">
			{headings && <thead>
				<tr>
					{headings.map((h, k) => <td key={k}>{h}</td>)}
				</tr>
			</thead>}

			<tbody>
				{rows.map((row, k) => <Row key={k} {...{k, row}} />)}
			</tbody>
		</table>
	);
}

export function DebugFooter ({count, what}) {
	return (
		<footer className="text-center py-6">
			<h5 className="text-slate-500"><span className="bg-green-500 text-white px-2 py-1 mr-1 rounded">{count}</span> {what}</h5>
		</footer>
	);
}
