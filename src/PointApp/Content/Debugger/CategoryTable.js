


function CategoryRow ({category, appdata, k}) {
	const notesCount = appdata.notes.filter(n => n.categoryId === category.id).length;

	return (
		<tr>
			<td>{k+1}</td>
			<td>{category.id}</td>
			<td>{category.title}</td>
			<td>{notesCount ? `${notesCount} notes` : ""}</td>
		</tr>
	);
}

export default function CategoryTable ({CATEGORIES, appdata}) {
	return (
		<div>
			<h4 className="text-center py-3">List of categories</h4>
			<table className="w-full">
				<tbody>
					{CATEGORIES.map((category, k) => <CategoryRow key={k} {...{category, appdata, k}} />)}
				</tbody>
			</table>
		</div>
	);
}
