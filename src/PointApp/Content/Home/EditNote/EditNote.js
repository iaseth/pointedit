import React from 'react';
import _ from 'lodash';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import Aspect from './Aspect';



const getNoteMeta = (note) => {
	const nuNoteObject = {...note};
	delete nuNoteObject.aspects;
	nuNoteObject.aspectsCount = note.aspects.length;
	nuNoteObject.pointsCount = note.aspects.map(a => a.points.length).reduce((t, x) => t+x, 0);

	return nuNoteObject;
};

export default function EditNote ({
	CATEGORIES, appdata, updateAppdata, goToCategory,
	noteId = null
}) {
	const [note, setNote] = React.useState(appdata.notes.find(n => n.id === noteId) || {
		id: appdata.noteId,
		createdAt: Date.now(),
		modifiedAt: Date.now(),
		openedAt: Date.now(),

		title: "",
		description: "",
		categoryId: appdata.defaultCategory,

		aspects: [],
		aspectId: 0
	});

	if (!note.aspects) note.aspects = [];
	const aspects = note.aspects;

	const saveNote = () => {
		const nuNoteObject = getNoteMeta(note);

		let index = appdata.notes.findIndex(n => n.id === nuNoteObject.id);
		if (index === -1) {
			// saving for the first time
			index = appdata.notes.length;
			if (appdata.noteId <= nuNoteObject.id) {
				appdata.noteId = nuNoteObject.id + 1;
			}
			appdata.notes[index] = nuNoteObject;
			updateAppdata(appdata);
		} else {
			// note was saved before
			const oldNoteObject = appdata.notes[index];
			if (!_.isEqual(nuNoteObject, oldNoteObject)) {
				appdata.notes[index] = nuNoteObject;
				updateAppdata(appdata);
			}
		}		

		console.log(nuNoteObject);
	};

	const updateNote = (newNote, modified=false) => {
		if (modified) {
			newNote.modifiedAt = Date.now();
		}
		setNote(newNote);
		saveNote();
	};

	const updateNoteProp = (prop, value) => {
		note[prop] = value;
		updateNote({...note}, true);
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
			<header className="border-x-4 border-green-500 shadow">
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
				{aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect}} />)}
			</main>

			<footer className="py-6">
				<Button onClick={() => goToCategory(note.categoryId)}>Go back</Button>
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
