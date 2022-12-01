import {
	DebugFooter,
	DebugHeader,
	DebugTable,
} from './DebugUtils';



export default function CategoryTable ({categories, notes}) {
	const CategoryRow = ({k, row}) => {
		const category = row;
		const cats = categories.filter(cat => cat.parent === category.id).length;
		const notesCount = notes.filter(n => n.categoryId === category.id).length;

		return (
			<tr>
				<td>{k+1}</td>
				<td className="text-blue-700">{category.title}</td>
				<td>
					<h5 className="text-slate-500">{category.id}</h5>
				</td>
				<td>{cats ? `${cats} cats` : ""}</td>
				<td>{notesCount ? `${notesCount} notes` : ""}</td>
			</tr>
		);
	};

	return (
		<div>
			<DebugHeader text="List of categories" />

			<main>
				<DebugTable headings={["", "Category", "ID", "Cats", "Notes"]} rows={categories} RowComponent={CategoryRow} />
			</main>

			<DebugFooter count={categories.length} what="categories" />
		</div>
	);
}
