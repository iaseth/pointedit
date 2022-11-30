import {CategoryGrid, NoteGrid} from '../HomeUtils';
import {Button} from '../../../Utils';



export default function Category ({
	appdata, category,
	goToDashboard, goToCategory, goToEditor, goToViewer
}) {
	const nestedCats = appdata.categories.filter(cat => cat.parent === category.id);
	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	const pinnedNotes = notes.filter(n => n.pinned);
	const sortedNotes = [...notes].sort((a, b) => (a.modifiedAt - b.modifiedAt));
	const recentNotes = sortedNotes.slice(0, 3);

	return (
		<div className="">
			<header className="max-w-3xl mx-auto px-4">
				<h2 className="py-2">{category.title}</h2>
				<p></p>
			</header>

			<main className="ch:px-4 ch:py-8 ch2:max-w-5xl ch2:mx-auto">
				<div>
					<NoteGrid {...{goToViewer}} notes={pinnedNotes} title="Pinned" />
				</div>

				<div className="bg-slate-100">
					<NoteGrid {...{goToViewer}} notes={recentNotes} title="Recent" />
				</div>

				<div>
					<NoteGrid {...{notes, goToViewer}} title="All" />
				</div>

				<div className="bg-slate-200">
					<CategoryGrid {...{appdata, goToCategory}} categories={nestedCats} />
				</div>
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
