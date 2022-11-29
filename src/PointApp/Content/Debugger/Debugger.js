import CategoryTable from './CategoryTable';
import NotesList from './NotesList';



export default function Debugger ({CATEGORIES, appdata}) {
	return (
		<div className="max-w-3xl mx-auto min-h-screen px-4">
			<header className="py-6"></header>

			<main>
				<div className="mx-auto">
					<CategoryTable {...{CATEGORIES, appdata}} />

					<div className="h-12"></div>

					<NotesList notes={appdata.notes} />
				</div>
			</main>

			<footer className="py-6"></footer>
		</div>
	);
}
