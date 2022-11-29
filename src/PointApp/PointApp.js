import React from 'react';

import './PointApp.scss';
import Header from './Header/Header';
import Footer from './Footer/Footer';

import Debugger from './Content/Debugger/Debugger';
import Home from './Content/Home/Home';
import Market from './Content/Market/Market';
import Settings from './Content/Settings/Settings';

const APPNAME = 'pointedit';

const TABS = [
	{title: "Home", char: "H", component: Home},
	{title: "Market", char: "M", component: Market},
	{title: "Settings", char: "S", component: Settings},
	{title: "Debug", char: "D", component: Debugger, debug: true},
];

const PRODUCTION = (process.env.NODE_ENV === 'development') ? false : true;

const CATEGORIES = [
	{title: "Ancient History", id: "ancient-history"},
	{title: "Medieval History", id: "medieval-history"},
	{title: "Modern History", id: "modern-history"},
	{title: "World History", id: "world-history"},

	{title: "Geography", id: "geography"},

	{title: "Polity", id: "polity"},
	{title: "Governance", id: "governance"},

	{title: "Economy", id: "economy"},
	{title: "SciTech", id: "scitech"},

	{title: "Uncategorized", id: "uncategorized"},
];

const APPDATA = {
	categories: CATEGORIES,
	defaultCategory: CATEGORIES.at(-1).id,
	notes: [],
	noteId: 0
};

const LS = window.localStorage;
const IDB = window.indexedDB;

const DATABASE_NAME = APPNAME;
const DATABASE_TABLES = [
	// {name: "notes", "fields": ['title', 'description'], keyPath: 'id'},
	{name: "aspects", "fields": [
		'title', 'introduction', 'conclusion',
		'createdAt', 'modifiedAt',
		'points', 'pointId'
	], keyPath: 'id'},
	{name: "points", "fields": [
		'text', 'createdAt', 'modifiedAt', 'hidden'
	], keyPath: 'id'}
];

function getAppdata () {
	if (LS.getItem('appdata') === null) {
		LS.setItem('appdata', JSON.stringify(APPDATA));
	}
	return JSON.parse(LS.getItem('appdata'));
}

export default function PointApp () {
	const [appdata, setAppdata] = React.useState(getAppdata());
	const updateAppdata = (newAppdata) => {
		setAppdata(newAppdata);
		LS.setItem('appdata', JSON.stringify(newAppdata));
		console.log(`Saved appdata at ${new Date().toLocaleTimeString()}`);
	};

	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const currentTabTitle = TABS[currentTabIndex].title;

	const [appDB, setAppDB] = React.useState(null);
	const [stores, setStores] = React.useState(null);
	const aspectsStore = stores?.aspects || null;
	const pointsStore = stores?.points || null;

	React.useEffect(() => {
		// console.log(`Creating database: '${DATABASE_NAME}'`);
		const request = IDB.open(DATABASE_NAME, 1);
		request.onsuccess = (event) => {
			const db = event.target.result;
			setAppDB(db);
			console.log(`Set 'appDB'`);

			const stores = {};
			DATABASE_TABLES.forEach(table => {
				const trans = db.transaction([table.name], 'readwrite');
				const store = trans.objectStore(table.name);
				stores[table.name] = store;
			});
			setStores(stores);
			console.log(`Set 'stores'`);
		};

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			DATABASE_TABLES.forEach(table => {
				const store = db.createObjectStore(table.name, {keyPath: table.keyPath});
				console.log(`\tcreated objectStore: '${table.name}'`);
				table.fields.forEach(field => {
					store.createIndex(field, field, {unique: false});
					console.log(`\t\tcreated index: '${table.name}.${field}'`);
				});
			});
		};
	}, []);

	const getCurrentAppTab = () => {
		switch (currentTabTitle) {
			case "Home":
				return <Home {...{appdata, updateAppdata}} />;
			case "Market":
				return <Market />;
			case "Settings":
				return <Settings />;
			case "Debug":
				return <Debugger {...{appdata}} />;
			default:
				return null;
		}
	};

	return (
		<div className="bg-slate-100">

			<main className="bg-slate-50">
				<Header {...{PRODUCTION, TABS, currentTabIndex, setCurrentTabIndex}} />

				{getCurrentAppTab()}

				<Footer />
			</main>

		</div>
	);
}
