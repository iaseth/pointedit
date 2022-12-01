import React from 'react';
import _ from 'lodash';

import {EditableText} from './Utils';



export default function Point ({k, pointId, addNewPoint, dbFuncs, LOGX}) {
	const [init, setInit] = React.useState(false);
	const [point, setPoint] = React.useState(null);

	React.useEffect(() => {
		if (!init) {
			const request = dbFuncs.getPointFromDB(pointId);
			request.onsuccess = () => {
				setPoint(request.result);
				setInit(true);
			};
		}
	}, [pointId, dbFuncs, init, setInit, setPoint]);

	const setText = (text) => {
		const nuPoint = {...point};
		nuPoint.text = text;
		updatePoint(nuPoint);
	};

	const updatePoint = (nuPoint) => {
		if (!_.isEqual(nuPoint, point)) {
			nuPoint.modifiedAt = Date.now();
			dbFuncs.savePointToDB(nuPoint);
			setPoint(nuPoint);
			LOGX.updatedAt('point', nuPoint.id);
		}
	};

	const onEnter = () => {
		addNewPoint(k+1);
	};

	if (!init) {
		return null;
	}

	return (
		<div className="flex items-center">
			<div className="grow">
				<EditableText number={k+1} text={point.text} {...{setText, onEnter}} autoFocus={true} />
			</div>
		</div>
	);
}
