import React from 'react';

import {Button} from '../../../Utils';
import {EditableText} from './Utils';
import Aspect from './Aspect';



export default function EditNote ({CATEGORIES, appdata, updateAppdata}) {
	const [content, setContent] = React.useState({
		id: appdata.noteId++,
		createdAt: Date.now(),
		modifiedAt: Date.now(),

		aspects: [],
		aspectId: 0
	});

	React.useEffect(() => {
		const noteObject = {...content};
		delete noteObject.aspects;

		let index = appdata.notes.findIndex(n => n.id === noteObject.id);
		if (index === -1) {
			index = appdata.notes.length;
		}
		appdata.notes[index] = noteObject;
		updateAppdata(appdata);

		console.log(content);
	}, [content]);

	const updateContent = (newContent) => {
		newContent.modifiedAt = Date.now();
		setContent(newContent);
	};

	const addNewAspect = () => {
		const aspect = {
			id: content.aspectId++,
			createdAt: Date.now(),
			modifiedAt: Date.now(),

			title: "",
			introduction: "",
			conclusion: "",

			points: [],
			pointId: 0,
			hidden: false
		};
		content.aspects.push(aspect);
		updateContent({...content});
	};

	const updateAspect = (aspect) => {
		const aspectIndex = content.aspects.findIndex(a => a.id === aspect.id);
		aspect.modifiedAt = Date.now();
		content.aspects[aspectIndex] = aspect;
		updateContent({...content});
	};

	return (
		<div className="max-w-xl mx-auto" id="EditNote">
			<header className="py-2 px-3">
				<h4>Edit Note</h4>
			</header>

			<div className="">
				{content.aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect}} />)}
			</div>

			<footer className="py-3 px-3">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
