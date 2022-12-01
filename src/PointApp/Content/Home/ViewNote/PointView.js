import React from 'react';



export default function PointView ({k, pointId, dbFuncs}) {
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
		<div className="py-1">
			<p>{point.text || <span className="faded">Empty</span>}</p>
		</div>
	);
}
