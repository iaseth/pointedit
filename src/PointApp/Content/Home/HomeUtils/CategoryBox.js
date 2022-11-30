


export function CategoryBox ({appdata, category, goToCategory}) {
	return (
		<div className="px-2 py-4">
			<div className="bg-white text-green-800 rounded shadow cursor-pointer hover:ring hover:ring-green-500" onClick={() => goToCategory(category.id)}>
				<div className="py-6 bg-green-200 flex">
					<h1 className="bg-white px-6 py-2 m-auto rounded">{appdata.notes.filter(n => n.categoryId === category.id).length}</h1>
				</div>
				<div>
					<h4 className="py-3 text-center">{category.title}</h4>
				</div>
			</div>
		</div>
	);
}
