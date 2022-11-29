import React from 'react';

import {ShowMoreButton} from '../../Utils';



function Count ({
	count, singular,
	plural=null, zero="No"
}) {
	plural = plural || singular + "s";

	return (
		<h5>{count || zero} {count === 1 ? singular : plural}</h5>
	);
}

export default function NotesList ({notes}) {
	const [n, setN] = React.useState(5);
	const showMore = () => {
		let x = n + 5;
		if (x > notes.length) {
			x = notes.length;
		}
		setN(x);
	};

	return (
		<div>
			<h4 className="text-center py-3">List of notes</h4>
			<table className="w-full">
				<thead>
					<tr className="cursor-pointer" onClick={() => setN(5)}>
						<td>#</td>
						<td>ID</td>
						<td>Title</td>
						<td>Times</td>
						<td>Content</td>
					</tr>
				</thead>

				<tbody>
					{notes.slice(0, n).map((n, k) => <tr key={n.id}>
						<td>{k+1}</td>
						<td>{n.id}</td>
						<td>
							<h4 className="text-green-600">{n.title}</h4>
							<h5>{n.categoryId}</h5>
						</td>
						<td>
							<h5>{n.createdAt}</h5>
							<h5>{n.modifiedAt}</h5>
						</td>
						<td>
							<Count count={n.aspectsCount} singular="aspect" />
							<Count count={n.pointsCount} singular="point" />
						</td>
					</tr>)}
				</tbody>
			</table>

			<div className="py-12">
				{(n < notes.length) && <ShowMoreButton onClick={showMore} />}
			</div>
		</div>
	);
}