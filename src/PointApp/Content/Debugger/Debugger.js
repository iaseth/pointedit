import NotesList from './NotesList';



export default function Debugger ({CATEGORIES, appdata}) {
	return (
		<div className="max-w-3xl mx-auto min-h-screen px-4">
			<header className="py-6">
				<h2 className="text-center">Debugger</h2>
			</header>

			<main>
				<div className="mx-auto">
					<h4 className="text-center py-3">List of categories</h4>
					<table className="w-full">
						<tbody>
							{CATEGORIES.map((c, k) => <tr key={k}>
								<td>{k+1}</td>
								<td>{c.id}</td>
								<td>{c.title}</td>
							</tr>)}
						</tbody>
					</table>

					<div className="h-12"></div>

					<NotesList notes={appdata.notes} />
				</div>
			</main>

			<footer className="py-6"></footer>
		</div>
	);
}
