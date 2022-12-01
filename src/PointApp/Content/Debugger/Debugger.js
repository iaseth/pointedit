import LocalStorage from './LocalStorage';
import IndexedDB from './IndexedDB';
import CategoryTable from './CategoryTable';
import NotesList from './NotesList';



export default function Debugger ({categories, notes, LOGX}) {
	return (
		<div className="max-w-3xl mx-auto min-h-screen px-4">
			<header className="py-2"></header>

			<main>
				<div className="space-y-10">
					<LocalStorage {...{LOGX}} />
					<IndexedDB />
					<CategoryTable {...{categories, notes}} />
					<NotesList {...{notes}} />
				</div>
			</main>

			<footer className="py-6"></footer>
		</div>
	);
}
