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
	{title: "Ancient History", name: "ancient-history"},
	{title: "Medieval History", name: "medieval-history"},
	{title: "Modern History", name: "modern-history"},
	{title: "World History", name: "world-history"},

	{title: "Geography", name: "geography"},

	{title: "Polity", name: "polity"},
	{title: "Governance", name: "governance"},

	{title: "Economy", name: "economy"},
	{title: "SciTech", name: "scitech"},
];

export default function PointApp () {
	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const CurrentComponent = TABS[currentTabIndex].component;

	return (
		<div className="bg-slate-100">

			<main className="bg-white">
				<Header {...{PRODUCTION, TABS, currentTabIndex, setCurrentTabIndex}} />
				<CurrentComponent {...{CATEGORIES}} />
				<Footer />
			</main>

		</div>
	);
}
