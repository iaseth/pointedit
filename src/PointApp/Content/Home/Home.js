import React from 'react';

import Category from './Category/Category';
import Dashboard from './Dashboard/Dashboard';
import EditNote from './EditNote/EditNote';
import ViewNote from './ViewNote/ViewNote';


const HOME_TABS = [
	{component: Dashboard},
	{component: Category},
	{component: EditNote},
	{component: ViewNote},
];

export default function Home ({CATEGORIES, appdata, updateAppdata}) {
	const [homeTabIndex, setHomeTabIndex] = React.useState(0);
	const CurrentComponent = HOME_TABS[homeTabIndex].component;

	const [noteId, setNodeId] = React.useState(-1);
	const [categoryId, setCategoryId] = React.useState(null);
	const category = CATEGORIES.find(c => c.id === categoryId) || null;

	const goToDashboard = () => setHomeTabIndex(0);
	const goToCategory = (id) => {
		setCategoryId(id);
		setHomeTabIndex(1);
	};
	const goToEditor = (id) => {
		setNodeId(id);
		setHomeTabIndex(2);
	};
	const goToViewer = () => {
		setHomeTabIndex(3)
	};

	const props = {
		CATEGORIES, appdata, updateAppdata,
		category, setCategoryId,
		noteId, setNodeId,
		goToDashboard, goToCategory, goToEditor, goToViewer,
	};

	return (
		<article className="min-h-screen px-4 py-4">
			<CurrentComponent {...props} />
		</article>
	);
}
