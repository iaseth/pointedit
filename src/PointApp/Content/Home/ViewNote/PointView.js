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
		<div className="py-1 flex">
			<div className="w-14 text-right pr-2">
				<span className="bg-500 text-white text-sm font-bold px-2 py-1 rounded">{k+1}</span>
			</div>
			<div className="grow py-[2px]">
				<p>{point.text || <span className="faded">Empty</span>}</p>
			</div>
		</div>
	);
}
