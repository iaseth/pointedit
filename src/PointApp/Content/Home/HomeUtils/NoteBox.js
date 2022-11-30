


function NDots ({n, className=""}) {
	return (
		<div className="py-3 flex flex-wrap justify-center">
			{[...Array(n)].map((x, k) => <div key={k} className="p-1">
				<div className={"w-4 h-4 bg-white rounded " + className}></div>
			</div>)}
		</div>
	);
}

export function NoteBox ({note, onClick}) {
	return (
		<article className="bg-white flex flex-col rounded shadow overflow-hidden cursor-pointer hover:ring hover:ring-green-500" onClick={onClick}>

			<header className="grow flex ch:basis-0 ch:grow ch:px-2 ch:pt-8 ch:pb-2 text-center">

				<section className="bg-green-100">
					<h5>
						<span className="bg-green-500 text-white px-2 py-1 rounded"># aspects</span>
					</h5>
					<NDots n={note.aspectsCount} className="bg-green-600" />
				</section>

				<section className="bg-green-400">
					<h5>
						<span className="bg-white text-green-800 px-2 py-1 rounded"># points</span>
					</h5>
					<NDots n={note.pointsCount} className="rounded-full" />
				</section>

			</header>

			<main className="px-3 py-3 border-t-2 border-green-500">
				<h4 className="text-green-800">{note.title || "No title"}</h4>
				<h5>{note.description || "No description"}</h5>
			</main>

		</article>
	);
}
