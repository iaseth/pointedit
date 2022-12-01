import React from 'react';
import _ from 'lodash';

import Category from './Category/Category';
import Dashboard from './Dashboard/Dashboard';
import EditNote from './EditNote/EditNote';
import ViewNote from './ViewNote/ViewNote';

import {getDefaultNoteObject} from './HomeUtils';



const HOME_TAB_NAMES = [
	"Dashboard",
	"Category",
	"EditNote",
	"ViewNote",
];

export default function Home ({
	appdata, categories, notes,
	updateAppdata, dbFuncs, LOGX
}) {
	const [homeTabIndex, setHomeTabIndex] = React.useState(0);
	const homeTabName = HOME_TAB_NAMES[homeTabIndex];

	const [noteId, setNoteId] = React.useState(-1);
	const note = notes.find(n => n.id === noteId) || null;

	const defaultCategory = categories.length - 1;
	const [categoryId, setCategoryId] = React.useState(defaultCategory);
	const category = categories.find(c => c.id === categoryId) || null;

	const goToDashboard = () => setHomeTabIndex(0);
	const goToCategory = (id) => {
		setCategoryId(id);
		setHomeTabIndex(1);
	};
	const goToEditor = (id) => {
		setNoteId(id);
		setHomeTabIndex(2);
	};
	const goToViewer = (id) => {
		setNoteId(id);
		setHomeTabIndex(3);
	};

	const goTo = {
		Dashboard: goToDashboard,
		Category: goToCategory,
		Editor: goToEditor,
		Viewer: goToViewer,
	};

	const saveNote = (nuNoteObject) => {
		nuNoteObject.aspectsCount = nuNoteObject.aspectIds.length;

		let index = appdata.notes.findIndex(n => n.id === nuNoteObject.id);
		if (index === -1) {
			// saving for the first time
			index = appdata.notes.length;
			const nuAppdata = {...appdata};
			if (nuAppdata.highestNoteId < nuNoteObject.id) {
				nuAppdata.highestNoteId = nuNoteObject.id;
			}
			nuAppdata.notes[index] = nuNoteObject;
			updateAppdata(nuAppdata);
		} else {
			// note was saved before
			const oldNoteObject = appdata.notes[index];
			if (!_.isEqual(nuNoteObject, oldNoteObject)) {
				const nuAppdata = {...appdata};
				nuAppdata.notes[index] = nuNoteObject;
				updateAppdata(nuAppdata);
			}
		}

		if (noteId !== nuNoteObject.id) {
			setNoteId(nuNoteObject.id);
		}
		LOGX.plain(nuNoteObject);
	};

	const getCurrentHomeTab = () => {
		switch (homeTabName) {
		case "Dashboard":
			return <Dashboard {...{notes, categories, goTo}} />;
		case "Category":
			return <Category {...{notes, categories, category, goTo}} />;
		case "EditNote": {
			const noteObject = note || getDefaultNoteObject(appdata.highestNoteId, categoryId);
			return <EditNote {...{categories, saveNote, goTo, dbFuncs}} note={noteObject} LOGX={LOGX.getChild('EditNote')} />;
		}
		case "ViewNote": {
			const category = categories.find(cat => cat.id === note.categoryId);
			return <ViewNote {...{note, category, goTo, dbFuncs}} />;
		}
		default:
			return null;
		}
	};

	return (
		<section className="min-h-screen pb-12">
			{getCurrentHomeTab()}
		</section>
	);
}
