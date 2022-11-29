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

export default function Home ({CATEGORIES, appdata, updateAppdata}) {
	const [homeTabIndex, setHomeTabIndex] = React.useState(0);
	const homeTabName = HOME_TAB_NAMES[homeTabIndex];

	const [noteId, setNoteId] = React.useState(-1);
	const noteObject = appdata.notes.find(n => n.id === noteId) || null;

	const [categoryId, setCategoryId] = React.useState(null);
	const category = CATEGORIES.find(c => c.id === categoryId) || null;

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

	const props = {
		CATEGORIES, appdata, updateAppdata,
		category, categoryId, setCategoryId,
		noteId, setNoteId, noteObject,
		goToDashboard, goToCategory, goToEditor, goToViewer,
	};

	const getCurrentHomeTab = () => {
		switch (homeTabName) {
			case "Dashboard":
				return <Dashboard {...props} />;
			case "Category":
				return <Category {...props} />;
			case "EditNote":
				return <EditNote {...props} />;
			case "ViewNote":
				return <ViewNote {...props} />;
			default:
				return null;
		}
	};

	return (
		<section className="min-h-screen px-4 py-4">
			{getCurrentHomeTab()}
		</section>
	);
}
