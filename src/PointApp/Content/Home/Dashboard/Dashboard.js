


function RecentItems () {}
function PinnedItems () {}

export default function Dashboard ({CATEGORIES, goToCategory}) {
	const catItems = CATEGORIES.map((c, k) => {
		return (
			<div key={k} className="px-2 py-4">
				<div className="shadow cursor-pointer" onClick={() => goToCategory(c.id)}>
					<div className="py-12 bg-green-200"></div>
					<div>
						<h4 className="py-3 text-center">{c.title}</h4>
					</div>
				</div>
			</div>
		);
	});

	return (
		<div className="max-w-3xl mx-auto">
			<h2 className="text-center py-4">Dashboard</h2>
			<div className="grid grid-cols-3">
				{catItems}
			</div>
		</div>
	);
}
