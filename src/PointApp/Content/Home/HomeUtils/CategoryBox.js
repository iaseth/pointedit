


export function CategoryBox ({appdata, category, goToCategory}) {
	return (
		<div className="bg-white text-green-800 rounded shadow cursor-pointer hover:ring hover:ring-green-500" onClick={() => goToCategory(category.id)}>
			<div className="py-8 bg-green-200 flex">
				<h1 className="bg-white px-6 py-2 m-auto rounded">{appdata.notes.filter(n => n.categoryId === category.id).length}</h1>
			</div>
			<div className="py-3 text-center">
				<h4 className="">{category.title}</h4>
				<h6 className="text-slate-500">Category</h6>
			</div>
		</div>
	);
}
