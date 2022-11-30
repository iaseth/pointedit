import {
	DebugFooter,
	DebugHeader,
	DebugTable,
} from './DebugUtils';



export default function CategoryTable ({appdata}) {
	const CategoryRow = ({k, row}) => {
		const category = row;
		const notesCount = appdata.notes.filter(n => n.categoryId === category.id).length;

		return (
			<tr className="ch:py-3">
				<td>{k+1}</td>
				<td className="text-green-800">{category.title}</td>
				<td>{category.id}</td>
				<td>{notesCount ? `${notesCount} notes` : ""}</td>
			</tr>
		);
	};

	return (
		<div>
			<DebugHeader text="List of categories" />

			<main>
				<DebugTable headings={["", "Category", "ID", "Notes"]} rows={appdata.categories} RowComponent={CategoryRow} />
			</main>

			<DebugFooter count={appdata.categories.length} what="categories" />
		</div>
	);
}
