import {CategoryGrid, NoteGrid} from '../HomeUtils';
import {Button} from '../../../Utils';



export default function Category ({appdata, category, goTo}) {
	const goToViewer = goTo.Viewer;

	const parentId = category.parent || null;
	const parent = parentId ? appdata.categories.find(cat => cat.id === parentId) : null;
	const siblings = parentId ? appdata.categories.filter(cat => cat.parent === parentId && cat.id !== category.id) : [];

	const children = appdata.categories.filter(cat => cat.parent === category.id);

	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	const pinnedNotes = notes.filter(n => n.pinned);
	const sortedNotes = [...notes].sort((a, b) => (a.modifiedAt - b.modifiedAt));
	const recentNotes = sortedNotes.slice(0, 3);

	return (
		<div className="">
			<header className="px-4 py-4">
				<section className="max-w-5xl mx-auto">
					{parent && <h4 className="text-green-800 cursor-pointer" onClick={() => goTo.Category(parent.id)}>{parent.title}</h4>}
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

				{children.length !== 0 && <div className="bg-slate-100">
					<CategoryGrid notes={appdata.notes} categories={children} goToCategory={goTo.Category} title="Sub Topics" />
				</div>}

				{siblings.length !== 0 && <div className="bg-slate-100">
					<CategoryGrid notes={appdata.notes} categories={siblings} goToCategory={goTo.Category} title="Similar Topics" />
				</div>}
			</main>

			<footer className="max-w-5xl mx-auto px-4 py-4 space-x-4">
				<div className={category.id}>
					<Button onClick={goTo.Dashboard}>Home</Button>
					<Button onClick={() => goTo.Editor(-1)}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
