


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
		<div className={note.categoryId}>
			<article className="bg-white flex flex-col rounded shadow overflow-hidden cursor-pointer hover:ring hover:ring-500" onClick={onClick}>

				<header className="grow flex ch:basis-0 ch:grow ch:px-2 ch:pt-8 ch:pb-2 text-center">

					<section className="bg-100">
						<h5>
							<span className="bg-500 text-white px-2 py-1 rounded"># aspects</span>
						</h5>
						<NDots n={note.aspectsCount} className="bg-600" />
					</section>

					<section className="bg-400">
						<h5>
							<span className="bg-white text-800 px-2 py-1 rounded"># points</span>
						</h5>
						<NDots n={note.pointsCount} className="rounded-full" />
					</section>

				</header>

				<main className="px-3 py-3 border-t-2 border-500 text-center">
					<h4 className="text-800">{note.title || "No title"}</h4>
					<h6 className="text-slate-500">Note</h6>
				</main>

			</article>
		</div>
	);
}
