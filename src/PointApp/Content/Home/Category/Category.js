import {NoteBox} from '../HomeUtils';
import {Button} from '../../../Utils';



export default function Category ({
	appdata, category,
	goToDashboard, goToCategory, goToEditor, goToViewer
}) {

	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	return (
		<div className="">
			<header className="max-w-3xl mx-auto px-4">
				<h2 className="py-2">{category.title}</h2>
				<p></p>
			</header>

			<main className="max-w-5xl mx-auto px-4 py-4">
				{notes.length === 0 ? <h4>No notes to show.</h4> : <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
					{notes.map(note => <NoteBox key={note.id} {...{note}} onClick={() => goToViewer(note.id)} />)}
				</div>}
			</main>

			<footer className="max-w-5xl mx-auto px-4 py-4 space-x-4">
				<div>
					<Button onClick={goToDashboard}>Back</Button>
					<Button onClick={() => goToEditor(-1)}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
