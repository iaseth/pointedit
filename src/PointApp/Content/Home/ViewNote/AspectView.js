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
		<section className="bg-white shadow px-4 py-2 border-l-4 border-green-500 ch:py-2">
			<header>
				<h3 className="py-2">{aspect.title || <span className="faded">No title</span>}</h3>
				<h4>{aspect.description || <span className="faded">No description</span>}</h4>
			</header>

			<main>
				<section className="px-4">
					{aspect.pointIds.map((pointId, k) => <PointView key={pointId} {...{k, pointId, dbFuncs}} />)}
				</section>
			</main>

			<footer>
				<h4>{aspect.conclusion || <span className="faded">No conclusion</span>}</h4>
			</footer>
		</section>
	);
}
