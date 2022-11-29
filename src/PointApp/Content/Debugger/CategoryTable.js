


function CategoryRow ({category, appdata, k}) {
	const notesCount = appdata.notes.filter(n => n.categoryId === category.id).length;

	return (
		<tr className="ch:py-3">
			<td>{k+1}</td>
			<td className="text-green-800">{category.title}</td>
			<td>{category.id}</td>
			<td>{notesCount ? `${notesCount} notes` : ""}</td>
		</tr>
	);
}

export default function CategoryTable ({appdata}) {
	return (
		<div>
			<h4 className="text-center py-3">List of categories</h4>
			<table className="w-full">
				<tbody>
					{appdata.categories.map((category, k) => <CategoryRow key={k} {...{category, appdata, k}} />)}
				</tbody>
			</table>
		</div>
	);
}