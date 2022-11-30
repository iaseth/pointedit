import {DebugHeader, DebugFooter} from './DebugUtils';



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
			<DebugHeader text="List of categories" />

			<main>
				<table className="w-full">
					<tbody>
						{appdata.categories.map((category, k) => <CategoryRow key={k} {...{category, appdata, k}} />)}
					</tbody>
				</table>
			</main>

			<DebugFooter count={appdata.categories.length} what="categories" />
		</div>
	);
}
