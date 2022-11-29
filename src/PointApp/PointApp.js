import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Debugger from './Content/Debugger/Debugger';
import Home from './Content/Home/Home';
import Market from './Content/Market/Market';
import Settings from './Content/Settings/Settings';

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

const LS = localStorage;
const APPDATA = {
	categories: CATEGORIES,
	defaultCategory: CATEGORIES.at(-1).id,
	notes: [],
	noteId: 0
};

export default function PointApp () {
	const [appdata, setAppdata] = React.useState(LS.getItem('appdata') === null ? APPDATA : JSON.parse(LS.getItem('appdata')));
	const updateAppdata = (newAppdata) => {
		setAppdata(newAppdata);
		LS.setItem('appdata', JSON.stringify(newAppdata));
		console.log(`Saved appdata at ${new Date().toLocaleTimeString()}`);
	};

	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const CurrentComponent = TABS[currentTabIndex].component;

	return (
		<div className="bg-slate-100">

			<main className="bg-slate-50">
				<Header {...{PRODUCTION, TABS, currentTabIndex, setCurrentTabIndex}} />
				<CurrentComponent {...{CATEGORIES, appdata, updateAppdata}} />
				<Footer />
			</main>

		</div>
	);
}
