import React from 'react';

import LOGX from './LOGX';
import {getStore, getStoreW} from './dbutils';

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

const TAB_CHARS = TABS.map(t => t.char);

const PRODUCTION = (process.env.NODE_ENV === 'development') ? false : true;

const CATEGORIES = [
	{title: "History", id: "history"},
	{title: "Ancient History", id: "ancient-history", parent: "history"},
	{title: "Medieval History", id: "medieval-history", parent: "history"},
	{title: "Modern History", id: "modern-history", parent: "history"},
	{title: "World History", id: "world-history", parent: "history"},

	{title: "Geography", id: "geography"},
	{title: "Indian Geography", id: "indian-geography", parent: "geography"},
	{title: "World Geography", id: "world-geography", parent: "geography"},
	{title: "Disaster Management", id: "disaster-management", parent: "geography"},

	{title: "Political Science", id: "ps"},
	{title: "Polity", id: "polity", parent: "ps"},
	{title: "Governance", id: "governance", parent: "ps"},
	{title: "Constitution", id: "constitution", parent: "ps"},
	{title: "IR", id: "ir", parent: "ps"},

	{title: "Economy", id: "econ"},
	{title: "Indian Economy", id: "indian-economy", parent: "econ"},
	{title: "World Economy", id: "world-economy", parent: "econ"},
	{title: "Agriculture", id: "agriculture", parent: "econ"},
	{title: "Schemes", id: "schemes", parent: "econ"},

	{title: "SciTech", id: "scitech"},
	{title: "Biology", id: "Biology", parent: "scitech"},
	{title: "Digital", id: "digital", parent: "scitech"},
	{title: "Science", id: "science", parent: "scitech"},
	{title: "Space", id: "space", parent: "scitech"},
	{title: "Technology", id: "technology", parent: "scitech"},

	{title: "Miscellaneous", id: "misc"},
	{title: "Security", id: "security", parent: "misc"},

	{title: "Ethics", id: "ethics"},

	{title: "Uncategorized", id: "uncategorized"},
];

const APPDATA = {
	categories: CATEGORIES,
	defaultCategory: CATEGORIES.at(-1).id,
	notes: [],
	highestNoteId: 0
};

const LS = window.localStorage;
const IDB = window.indexedDB;

const DATABASE_NAME = APPNAME;
const DATABASE_TABLES = [
	// {name: "notes", "fields": ['title', 'description'], keyPath: 'id'},
	{name: "aspects", "fields": [
		'noteId',
		'createdAt', 'modifiedAt', 'hidden',
		'points', 'highestPointId'
	], keyPath: 'id'},
	{name: "points", "fields": [
		'noteId', 'aspectId',
		'createdAt', 'modifiedAt', 'hidden'
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
		LOGX.savedAt('appdata');
	};

	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const currentTabTitle = TABS[currentTabIndex].title;
	const currentTabChar = TABS[currentTabIndex].char;

	const [appDB, setAppDB] = React.useState(null);

	React.useEffect(() => {
		LOGX.created('database', DATABASE_NAME);
		const request = IDB.open(DATABASE_NAME, 1);
		request.onsuccess = (event) => {
			const db = event.target.result;
			setAppDB(db);
			LOGX.setState('appDB');
		};

		request.onupgradeneeded = (event) => {
			const db = event.target.result;
			DATABASE_TABLES.forEach(table => {
				const store = db.createObjectStore(table.name, {keyPath: table.keyPath});
				LOGX.created('objectStore', table.name);
				table.fields.forEach(field => {
					store.createIndex(field, field, {unique: false});
					LOGX.created('index', `${table.name}.${field}`);
				});
			});
		};
	}, []);


	const getAspectFromDB = (aspectId) => {
		const aspectsStore = getStore(appDB, 'aspects');
		return aspectsStore ? aspectsStore.get(aspectId) : null;
	};
	const saveAspectToDB = (aspectObject) => {
		const aspectsStore = getStoreW(appDB, 'aspects');
		if (aspectsStore) {
			aspectsStore.put(aspectObject);
			// LOGX.savedAt('aspect');
		}
	};

	const getPointFromDB = (pointId) => {
		const pointsStore = getStore(appDB, 'points');
		return pointsStore ? pointsStore.get(pointId) : null;
	};
	const savePointToDB = (pointObject) => {
		const pointsStore = getStoreW(appDB, 'points');
		if (pointsStore) {
			pointsStore.put(pointObject);
		}
	};

	const dbFuncs = {
		getAspectFromDB, saveAspectToDB,
		getPointFromDB, savePointToDB,
	};


	const goToTab = (char) => {
		if (currentTabChar !== char) {
			const tabIndex = TABS.findIndex(t => t.char === char);
			setCurrentTabIndex(tabIndex);
		}
	};

	const handleKeyDown = (e) => {
		if (e.ctrlKey && e.shiftKey && e.altKey) {
			if (TAB_CHARS.includes(e.key)) {
				goToTab(e.key);
			}
		}
	};
	React.useEffect(() => {
		window.addEventListener('keydown', handleKeyDown, false);
		return () => window.removeEventListener('keydown', handleKeyDown, false);
	});

	const getCurrentAppTab = () => {
		switch (currentTabTitle) {
			case "Home":
				return <Home {...{appdata, updateAppdata, dbFuncs}} LOGX={LOGX.getChild('Home')} />;
			case "Market":
				return <Market />;
			case "Settings":
				return <Settings />;
			case "Debug":
				return <Debugger {...{appdata}} LOGX={LOGX.getChild('Debugger')} />;
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
