import {NoteBox} from './NoteBox';



export function NoteGrid ({appdata, category, goToViewer}) {
	const notes = appdata.notes.filter(n => n.categoryId === category.id);

	return (
		<div>
			{(notes.length === 0) && <h4>No notes to show.</h4>}
			{(notes.length > 0) && <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6">
				{notes.map(note => <NoteBox key={note.id} {...{note}} onClick={() => goToViewer(note.id)} />)}
			</div>}
		</div>
	);
}
