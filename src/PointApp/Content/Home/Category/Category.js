import {Button} from '../../../Utils';



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
				{notes.length === 0 ? <h4>No notes to show.</h4> : <div className="md:grid grid-cols-3">
					{notes.map(n => <article key={n.id} className="bg-green-200 px-3 py-3 cursor-pointer" onClick={() => goToEditor(n.id)}>
						<h4>{n.title || "No title"}</h4>
						<h5>{n.description || "No description"}</h5>
					</article>)}
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
