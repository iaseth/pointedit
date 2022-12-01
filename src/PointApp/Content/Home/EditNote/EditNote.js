import React from 'react';
import _ from 'lodash';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import Aspect from './Aspect';



const MAX_POINTS = 100;

export default function EditNote ({
	appdata, updateAppdata, goTo,
	note, saveNote, dbFuncs, LOGX
}) {
	const [aspects, setAspects] = React.useState([]);

	const updateNote = (nuNote, modified=false) => {
		if (modified) {
			nuNote.modifiedAt = Date.now();
		}
		saveNote({...note}, aspects);
		LOGX.updated('note', nuNote.id);
	};

	const updateNoteProp = (prop, value) => {
		note[prop] = value;
		updateNote({...note}, true);
	};

	const addNewAspect = () => {
		const nuAspectId = note.highestAspectId++;
		const nuAspect = {
			id: nuAspectId,
			noteId: note.id,
			createdAt: Date.now(),
			modifiedAt: Date.now(),

			title: "",
			introduction: "",
			conclusion: "",

			pointIds: [],
			pointsCount: [],
			highestPointId: nuAspectId * MAX_POINTS,
			hidden: false
		};
		dbFuncs.saveAspectToDB(nuAspect);
		aspects.push(nuAspect);
		setAspects([...aspects]);
		saveNote({...note}, aspects);
	};

	const updateAspect = (nuAspect) => {
		const aspectIndex = aspects.findIndex(a => a.id === nuAspect.id);
		const currentAspect = aspects[aspectIndex];
		if (!_.isEqual(nuAspect, currentAspect)) {
			nuAspect.modifiedAt = Date.now();
			dbFuncs.saveAspectToDB(nuAspect);
			aspects[aspectIndex] = nuAspect;
			setAspects([...aspects]);
			LOGX.updatedAt('aspect', nuAspect.id);
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
