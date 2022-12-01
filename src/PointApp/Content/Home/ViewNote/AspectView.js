import React from 'react';

import PointView from './PointView';



export default function AspectView ({aspectId, dbFuncs}) {
	const [aspect, setAspect] = React.useState(null);

	React.useEffect(() => {
		const request = dbFuncs.getAspectFromDB(aspectId);
		request.onsuccess = () => {
			setAspect(request.result);
		};
	}, [aspectId, dbFuncs]);

	if (!aspect) {
		return null;
	}

	return (
		<section className="bg-white shadow px-4 border-l-4 border-500 rounded-r">
			<header className="py-2">
				<h3 className="py-2">{aspect.title || <span className="faded">No title</span>}</h3>
				<p>{aspect.description || <span className="faded">No description</span>}</p>
			</header>

			<main>
				<section className="px-4 py-2">
					{aspect.pointIds.map((pointId, k) => <PointView key={pointId} {...{k, pointId, dbFuncs}} />)}
				</section>
			</main>

			<footer className="py-3">
				<p>{aspect.conclusion || <span className="faded">No conclusion</span>}</p>
			</footer>
		</section>
	);
}
