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
			<p>
				<span className="bg-500 text-white text-sm font-bold px-2 py-1 mr-2 rounded">{k+1}</span>
				<span>{point.text || <span className="faded">Empty</span>}</span>
			</p>
		</div>
	);
}
