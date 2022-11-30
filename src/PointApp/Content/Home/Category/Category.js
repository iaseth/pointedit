import {CategoryGrid, NoteGrid} from '../HomeUtils';
import {Button} from '../../../Utils';



export default function Category ({appdata, category, goTo}) {
	const goToViewer = goTo.Viewer;

	const nestedCats = appdata.categories.filter(cat => cat.parent === category.id);
	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	const pinnedNotes = notes.filter(n => n.pinned);
	const sortedNotes = [...notes].sort((a, b) => (a.modifiedAt - b.modifiedAt));
	const recentNotes = sortedNotes.slice(0, 3);

	return (
		<div className="">
			<header className="px-4 py-4">
				<section className="max-w-5xl mx-auto">
					<h2 className="py-2">{category.title}</h2>
					<p></p>
				</section>
			</header>

			<main className="ch2:max-w-5xl ch2:mx-auto ch:px-4 ch:py-8">
				{pinnedNotes.length !== 0 && <div>
					<NoteGrid {...{goToViewer}} notes={pinnedNotes} title="Pinned" />
				</div>}

				{recentNotes.length !== 0 && <div className="bg-slate-100">
					<NoteGrid {...{goToViewer}} notes={recentNotes} title="Recent" />
				</div>}

				<div>
					<NoteGrid {...{notes, goToViewer}} title="All" />
				</div>

				{nestedCats.length !== 0 && <div className="bg-slate-100">
					<CategoryGrid {...{appdata}} categories={nestedCats} goToCategory={goTo.Category} />
				</div>}
			</main>

			<footer className="max-w-5xl mx-auto px-4 py-4 space-x-4">
				<div>
					<Button onClick={goTo.Dashboard}>Back</Button>
					<Button onClick={() => goTo.Editor(-1)}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
