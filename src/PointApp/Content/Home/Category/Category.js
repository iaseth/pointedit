import {Button} from '../../../Utils';



function NDots ({n, className=""}) {
	return (
		<div className="py-3 flex justify-center">
			{[...Array(n)].map((x, k) => <div key={k} className="p-1">
				<div className={"w-4 h-4 bg-white rounded " + className}></div>
			</div>)}
		</div>
	);
}

function Note ({note, onClick}) {
	return (
		<article className="bg-white rounded shadow overflow-hidden cursor-pointer" onClick={onClick}>

			<header className="flex ch:grow ch:px-2 ch:pt-8 ch:pb-2 text-center border-4 border-green-500">

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

			<main className="px-3 py-3 border-4 border-t-0 border-green-500">
				<h4 className="text-green-800">{note.title || "No title"}</h4>
				<h5>{note.description || "No description"}</h5>
			</main>

		</article>
	);
}

export default function Category ({
	appdata, category,
	goToDashboard, goToCategory, goToEditor, goToViewer
}) {

	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	return (
		<div className="max-w-3xl mx-auto">
			<header className="px-4">
				<h2 className="py-5">{category.title}</h2>
				<p></p>
			</header>

			<main className="px-4 py-4">
				{notes.length === 0 ? <h4>No notes to show.</h4> : <div className="md:grid grid-cols-2">
					{notes.map(note => <Note key={note.id} {...{note}} onClick={() => goToEditor(note.id)} />)}
				</div>}
			</main>

			<footer className="px-4 py-4 space-x-4">
				<div>
					<Button onClick={goToDashboard}>Back</Button>
					<Button onClick={() => goToEditor()}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
