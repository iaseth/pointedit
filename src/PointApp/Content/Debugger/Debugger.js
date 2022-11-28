


export default function Debugger ({CATEGORIES, appdata}) {
	return (
		<div className="max-w-3xl mx-auto min-h-screen px-4">
			<header className="py-6">
				<h2 className="text-center">Debugger</h2>
			</header>

			<main>
				<div className="mx-auto max-w-xl">
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

					<h4 className="text-center py-3">List of notes</h4>
					<table className="w-full">
						<thead>
							<tr>
								<td>#</td>
								<td>ID</td>
								<td>Title</td>
								<td>Times</td>
								<td>Aspects</td>
							</tr>
						</thead>
						<tbody>
							{appdata.notes.map((n, k) => <tr key={n.id}>
								<td>{k+1}</td>
								<td>{n.id}</td>
								<td>{n.title}</td>
								<td>
									<h5>{n.createdAt}</h5>
									<h5>{n.modifiedAt}</h5>
								</td>
								<td>{n.aspectId}</td>
							</tr>)}
						</tbody>
					</table>
				</div>
			</main>

			<footer className="py-6"></footer>
		</div>
	);
}
