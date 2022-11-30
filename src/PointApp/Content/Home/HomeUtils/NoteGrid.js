import {Grid} from './Grid';
import {NoteBox} from './NoteBox';



export function NoteGrid ({notes, goToViewer, title=null}) {

	return (
		<div>
			<header>
				{title && <h3>{title}</h3>}
			</header>

			<main className="py-3">
				{(notes.length === 0) && <h4 className="text-slate-500">No notes to show.</h4>}
				{(notes.length > 0) && <Grid>
					{notes.map(note => <NoteBox key={note.id} {...{note}} onClick={() => goToViewer(note.id)} />)}
				</Grid>}
			</main>
		</div>
	);
}
