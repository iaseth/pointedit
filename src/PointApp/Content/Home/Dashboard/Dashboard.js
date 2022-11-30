import {CategoryGrid} from '../HomeUtils';
import {NoteGrid} from '../HomeUtils';


// function RecentItems () {}
// function PinnedItems () {}

export default function Dashboard ({appdata, goToCategory, goToViewer}) {
	const topLevelCats = appdata.categories.filter(cat => !cat.parent);
	const notes = appdata.notes;

	const pinnedNotes = notes.filter(n => n.pinned).slice(0, 3);
	const sortedNotes = [...notes].sort((a, b) => (a.modifiedAt - b.modifiedAt));
	const recentNotes = sortedNotes.slice(0, 3);

	return (
		<div className="">

			<main className="ch:px-4 ch:py-8 ch2:max-w-5xl ch2:mx-auto">
				{pinnedNotes.length !== 0 && <div>
					<NoteGrid {...{goToViewer}} notes={pinnedNotes} title="Pinned" />
				</div>}

				{recentNotes.length !== 0 && <div className="bg-slate-100">
					<NoteGrid {...{goToViewer}} notes={recentNotes} title="Recent" />
				</div>}

				<div>
					<CategoryGrid {...{appdata, goToCategory}} categories={topLevelCats} />
				</div>
			</main>

		</div>
	);
}
