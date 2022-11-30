import React from 'react';
import _ from 'lodash';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import {getDefaultNoteObject} from '../HomeUtils';
import Aspect from './Aspect';



const MAX_POINTS = 100;

export default function EditNote ({
	appdata, updateAppdata, categoryId, goTo,
	noteId, setNoteId, noteObject, LOGX
}) {
	const [note, setNote] = React.useState(noteObject || getDefaultNoteObject(appdata.noteId, categoryId));
	const [aspects, setAspects] = React.useState([]);

	React.useEffect(() => {
		const aspectIds = aspects.map(a => a.id);
		const pointsCount = aspects.map(a => a.pointsCount).reduce((t, x) => t+x, 0);
		if (!_.isEqual(aspectIds, note.aspectIds) || pointsCount !== note.pointsCount) {
			note.aspectIds = aspectIds;
			note.aspectsCount = aspectIds.length;
			updateNote({...note});
		}
	}, [aspects]);

	const saveNote = () => {
		const nuNoteObject = {...note};
		nuNoteObject.aspectIds = aspects.map(a => a.id);
		nuNoteObject.aspectsCount = aspects.length;
		nuNoteObject.pointsCount = aspects.map(a => a.pointsCount).reduce((t, x) => t+x, 0);

		let index = appdata.notes.findIndex(n => n.id === nuNoteObject.id);
		if (index === -1) {
			// saving for the first time
			index = appdata.notes.length;
			if (appdata.noteId <= nuNoteObject.id) {
				appdata.noteId = nuNoteObject.id + 1;
			}
			appdata.notes[index] = nuNoteObject;
			updateAppdata(appdata);
			setNoteId(nuNoteObject.id);
		} else {
			// note was saved before
			const oldNoteObject = appdata.notes[index];
			if (!_.isEqual(nuNoteObject, oldNoteObject)) {
				appdata.notes[index] = nuNoteObject;
				updateAppdata(appdata);
			}
		}		

		LOGX.plain(nuNoteObject);
	};

	const updateNote = (nuNote, modified=false) => {
		if (modified) {
			nuNote.modifiedAt = Date.now();
		}
		setNote(nuNote);
		saveNote();
		LOGX.put(`Updated note: '${nuNote.id}'`);
	};

	const updateNoteProp = (prop, value) => {
		note[prop] = value;
		updateNote({...note}, true);
	};

	const addNewAspect = () => {
		const aspectId = note.aspectId++;
		const aspect = {
			id: aspectId,
			createdAt: Date.now(),
			modifiedAt: Date.now(),

			title: "",
			introduction: "",
			conclusion: "",

			pointIds: [],
			pointsCount: [],
			pointId: aspectId * MAX_POINTS,
			hidden: false
		};
		aspects.push(aspect);
		setAspects([...aspects]);
	};

	const updateAspect = (nuAspect) => {
		const aspectIndex = aspects.findIndex(a => a.id === nuAspect.id);
		const aspect = aspects[aspectIndex];
		if (!_.isEqual(nuAspect, aspect)) {
			nuAspect.modifiedAt = Date.now();
			aspects[aspectIndex] = nuAspect;
			setAspects([...aspects]);
			LOGX.updated('aspect', nuAspect.id);
		}
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

				<ItemsSelector ITEMS={appdata.categories} itemId={note.categoryId} setItemId={v => updateNoteProp('categoryId', v)} />
			</header>

			<main className="">
				{aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect}} />)}
			</main>

			<footer className="py-6">
				<Button onClick={() => goTo.Category(note.categoryId)}>Go back</Button>
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
