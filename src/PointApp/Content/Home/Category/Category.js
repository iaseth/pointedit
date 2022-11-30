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

			<main className="max-w-5xl mx-auto px-4 py-4">
				<NoteGrid {...{goToViewer}} notes={pinnedNotes} title="Pinned" />
				<NoteGrid {...{goToViewer}} notes={recentNotes} title="Recent" />
				<NoteGrid {...{notes, goToViewer}} title="All" />

				<CategoryGrid {...{appdata, goToCategory}} categories={nestedCats} />
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
