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
		<section className="bg-white shadow px-4 py-3 border-l-4 border-green-500 ch:py-2">
			<header>
				<h3>{aspect.title}</h3>
				<h4>{aspect.description}</h4>
			</header>

			<main>
				<section className="px-4">
					{aspect.pointIds.map(pointId => <PointView key={pointId} {...{pointId, dbFuncs}} />)}
				</section>
			</main>

			<footer>
				<h4>{aspect.conclusion}</h4>
			</footer>
		</section>
	);
}
