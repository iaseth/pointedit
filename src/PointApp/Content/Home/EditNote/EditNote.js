import React from 'react';
// import _ from 'lodash';

import {Button} from '../../../Utils';
import {EditableText, ItemsSelector} from './Utils';
import Aspect from './Aspect';
import LastSaved from './LastSaved';



const MAX_POINTS = 1000;

export default function EditNote ({
	categories, note, saveNote,
	goTo, dbFuncs, LOGX
}) {
	const aspectIds = note.aspectIds;

	const updateNote = (nuNote, modified=false) => {
		if (modified) {
			nuNote.modifiedAt = Date.now();
		}
		saveNote(nuNote);
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

		const nuNote = {...note};
		nuNote.aspectIds.push(nuAspect.id);
		saveNote(nuNote);
	};

	return (
		<div className={note.categoryId} id="EditNote">
			<header className="max-w-xl mx-auto px-4 py-8">
				<section className="border-x-2 border-b-2 border-500 shadow">
					<h5 className="px-2 py-1 bg-500 text-white">Note</h5>
					<h3>
						<EditableText text={note.title} setText={v => updateNoteProp('title', v)} placeholder="Title" autoFocus={true} />
					</h3>

					<div>
						<EditableText text={note.description} setText={v => updateNoteProp('description', v)} placeholder="Description" />
					</div>

					<ItemsSelector ITEMS={categories} itemId={note.categoryId} setItemId={v => updateNoteProp('categoryId', v)} />

					<div>
						<LastSaved time={note.modifiedAt} />
					</div>
				</section>
			</header>

			<main className="max-w-3xl mx-auto px-4">
				{aspectIds.map((aspectId, k) => <Aspect key={aspectId} {...{k, aspectId, dbFuncs, LOGX}} />)}
			</main>

			<footer className="max-w-3xl mx-auto px-4 py-6">
				<Button onClick={() => goTo.Category(note.categoryId)}>Go back</Button>
				<Button onClick={addNewAspect}>Add Aspect</Button>
			</footer>
		</div>
	);
}
