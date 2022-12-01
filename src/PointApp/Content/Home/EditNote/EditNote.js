import React from 'react';
import _ from 'lodash';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import Aspect from './Aspect';



const MAX_POINTS = 1000;

export default function EditNote ({
	appdata, updateAppdata, goTo,
	note, saveNote, dbFuncs, LOGX
}) {
	const [aspects, setAspects] = React.useState([]);

	const updateNote = (nuNote, modified=false) => {
		if (modified) {
			nuNote.modifiedAt = Date.now();
		}
		saveNote({...nuNote}, aspects);
		LOGX.updated('note', nuNote.id);
	};

	const updateNoteProp = (prop, value) => {
		const nuNote = {...note};
		nuNote[prop] = value;
		updateNote(nuNote, true);
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

		const nuAspects = [...aspects];
		nuAspects.push(nuAspect);
		setAspects(nuAspects);
		saveNote({...note}, nuAspects);
	};

	const updateAspect = (nuAspect) => {
		const aspectIndex = aspects.findIndex(a => a.id === nuAspect.id);
		const currentAspect = aspects[aspectIndex];
		if (!_.isEqual(nuAspect, currentAspect)) {
			nuAspect.modifiedAt = Date.now();
			dbFuncs.saveAspectToDB(nuAspect);

			const nuAspects = [...aspects];
			nuAspects[aspectIndex] = nuAspect;
			setAspects(nuAspects);
			LOGX.updatedAt('aspect', nuAspect.id);
		}
	};

	return (
		<div className="" id="EditNote">
			<header className="max-w-xl mx-auto px-4 py-8">
				<section className="border-x-2 border-green-500 shadow">
					<h5 className="px-2 py-1 bg-green-500 text-white">Note</h5>
					<h3>
						<EditableText text={note.title} setText={v => updateNoteProp('title', v)} placeholder="Title" autoFocus={true} />
					</h3>

					<h4>
						<EditableText text={note.description} setText={v => updateNoteProp('description', v)} placeholder="Description" />
					</h4>

					<ItemsSelector ITEMS={appdata.categories} itemId={note.categoryId} setItemId={v => updateNoteProp('categoryId', v)} />
				</section>
			</header>

			<main className="max-w-3xl mx-auto px-4">
				{aspects.map((aspect, k) => <Aspect key={aspect.id} {...{k, aspect, updateAspect, dbFuncs}} />)}
			</main>

			<footer className="max-w-3xl mx-auto px-4 py-6">
				<Button onClick={() => goTo.Category(note.categoryId)}>Go back</Button>
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
