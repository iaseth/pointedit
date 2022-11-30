import React from 'react';

import Category from './Category/Category';
import Dashboard from './Dashboard/Dashboard';
import EditNote from './EditNote/EditNote';
import ViewNote from './ViewNote/ViewNote';


const HOME_TAB_NAMES = [
	"Dashboard",
	"Category",
	"EditNote",
	"ViewNote",
];

export default function Home ({appdata, updateAppdata, LOGX}) {
	const [homeTabIndex, setHomeTabIndex] = React.useState(0);
	const homeTabName = HOME_TAB_NAMES[homeTabIndex];

	const {categories, notes} = appdata;

	const [noteId, setNoteId] = React.useState(-1);
	const note = notes.find(n => n.id === noteId) || null;

	const [categoryId, setCategoryId] = React.useState(null);
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

	const getCurrentHomeTab = () => {
		switch (homeTabName) {
			case "Dashboard":
				return <Dashboard {...{appdata, goToCategory, goToViewer}} />;
			case "Category":
				return <Category {...{appdata, category, goToDashboard, goToCategory, goToEditor, goToViewer}} />;
			case "EditNote":
				return <EditNote {...{appdata, updateAppdata, categoryId, goToCategory, noteId, setNoteId, LOGX}} noteObject={note} LOGX={LOGX.getChild('EditNote')} />;
			case "ViewNote":
				return <ViewNote {...{note, category, goToDashboard, goToCategory, goToEditor}} />;
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
