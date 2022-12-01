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

export default function Home ({appdata, updateAppdata, dbFuncs, LOGX}) {
	const [homeTabIndex, setHomeTabIndex] = React.useState(0);
	const homeTabName = HOME_TAB_NAMES[homeTabIndex];

	const {categories, notes} = appdata;

	const [noteId, setNoteId] = React.useState(-1);
	const note = notes.find(n => n.id === noteId) || null;

	const [categoryId, setCategoryId] = React.useState(appdata.defaultCategory);
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
		setHomeTabIndex(3)
	};

	const goTo = {
		Dashboard: goToDashboard,
		Category: goToCategory,
		Editor: goToEditor,
		Viewer: goToViewer,
	};

	const saveNote = (nuNoteObject, aspects) => {
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
		} else {
			// note was saved before
			const oldNoteObject = appdata.notes[index];
			if (!_.isEqual(nuNoteObject, oldNoteObject)) {
				appdata.notes[index] = nuNoteObject;
				updateAppdata(appdata);
			}
		}

		setNoteId(nuNoteObject.id);
		LOGX.plain(nuNoteObject);
	};

	const getCurrentHomeTab = () => {
		switch (homeTabName) {
			case "Dashboard":
				return <Dashboard {...{appdata, goTo}} />;
			case "Category":
				return <Category {...{appdata, category, goTo}} />;
			case "EditNote": {
				const noteObject = note || getDefaultNoteObject(appdata.noteId, categoryId);
				return <EditNote {...{appdata, updateAppdata, goTo, saveNote, dbFuncs}} note={noteObject} LOGX={LOGX.getChild('EditNote')} />;
			}
			case "ViewNote": {
				const category = categories.find(cat => cat.id === note.categoryId);
				return <ViewNote {...{note, category, goTo}} />;
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
