


// function RecentItems () {}
// function PinnedItems () {}

export default function Dashboard ({appdata, goToCategory}) {
	const catItems = appdata.categories.filter(cat => !cat.parent).map((c, k) => {
		return (
			<div key={k} className="px-2 py-4">
				<div className="bg-white text-green-800 rounded shadow cursor-pointer hover:ring hover:ring-green-500" onClick={() => goToCategory(c.id)}>
					<div className="py-6 bg-green-200 flex">
						<h1 className="bg-white px-6 py-2 m-auto rounded">{appdata.notes.filter(n => n.categoryId === c.id).length}</h1>
					</div>
					<div>
						<h4 className="py-3 text-center">{c.title}</h4>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="max-w-3xl mx-auto">
			<div className="grid grid-cols-3">
				{catItems}
			</div>
		</div>
	);
}
