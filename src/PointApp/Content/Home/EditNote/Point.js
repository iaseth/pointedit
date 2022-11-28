import React from 'react';

import {EditableText} from './Utils';



export default function Point ({k, point, updatePoint, addNewPoint}) {
	const setText = (text) => {
		point.text = text;
		updatePoint(point);
	};

	const onEnter = () => {
		addNewPoint(k+1);
	};

	return (
		<div className="flex items-center">
			<h4 className="grow">
				<EditableText number={k+1} text={point.text} {...{setText, onEnter}} autoFocus={true} />
			</h4>
		</div>
	);
}
