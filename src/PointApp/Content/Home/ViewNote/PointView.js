import React from 'react';



export default function PointView ({pointId, dbFuncs}) {
	const [point, setPoint] = React.useState(null);

	React.useEffect(() => {
		const request = dbFuncs.getPointFromDB(pointId);
		request.onsuccess = () => {
			setPoint(request.result);
		};
	}, [pointId, dbFuncs]);

	if (!point) {
		return null;
	}

	return (
		<div>
			<p>{point.text}</p>
		</div>
	);
}
