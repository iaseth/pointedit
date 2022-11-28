import React from 'react';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import Aspect from './Aspect';





export default function EditNote ({
	CATEGORIES, appdata, updateAppdata,
	noteId = null
}) {
	const [note, setNote] = React.useState(appdata.notes.find(n => n.id === noteId) || {
		id: appdata.noteId,
		createdAt: Date.now(),
		modifiedAt: Date.now(),

		title: "",
		description: "",
		categoryId: appdata.defaultCategory,

		aspects: [],
		aspectId: 0
	});

	React.useEffect(() => {
		const noteObject = {...note};
		delete noteObject.aspects;
		noteObject.aspectsCount = note.aspects.length;
		noteObject.pointsCount = note.aspects.map(a => a.points.length).reduce((t, x) => t+x, 0);

		let index = appdata.notes.findIndex(n => n.id === noteObject.id);
		if (index === -1) {
			index = appdata.notes.length;
		}
		appdata.notes[index] = noteObject;
		if (appdata.noteId <= noteObject.id) {
			appdata.noteId = noteObject.id + 1;
		}
		updateAppdata(appdata);

		console.log(note);
	}, [note, appdata, updateAppdata]);

	const updateNote = (newNote) => {
		newNote.modifiedAt = Date.now();
		setNote(newNote);
	};

	const updateNoteProp = (prop, value) => {
		note[prop] = value;
		updateNote({...note});
	};

	const addNewAspect = () => {
		const aspect = {
			id: note.aspectId++,
			createdAt: Date.now(),
			modifiedAt: Date.now(),

			title: "",
			introduction: "",
			conclusion: "",

			points: [],
			pointId: 0,
			hidden: false
		};
		note.aspects.push(aspect);
		updateNote({...note});
	};

	const updateAspect = (aspect) => {
		const aspectIndex = note.aspects.findIndex(a => a.id === aspect.id);
		aspect.modifiedAt = Date.now();
		note.aspects[aspectIndex] = aspect;
		updateNote({...note});
	};

	return (
		<div className="max-w-xl mx-auto" id="EditNote">
			<header className="py-2">
				<h5 className="px-2 py-1 text-green-500">Note</h5>
				<h3>
					<EditableText text={note.title} setText={v => updateNoteProp('title', v)} placeholder="Title" autoFocus={true} />
				</h3>

				<h4>
					<EditableText text={note.description} setText={v => updateNoteProp('description', v)} placeholder="Description" />
				</h4>

				<ItemsSelector ITEMS={CATEGORIES} itemId={note.categoryId} setItemId={v => updateNoteProp('categoryId', v)} />
			</header>

			<main className="">
				{note.aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect}} />)}
			</main>

			<footer className="py-3 px-3">
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
