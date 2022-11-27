import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';

import Home from './Content/Home';
import Market from './Content/Market';
import Settings from './Content/Settings';

const TABS = [
	{title: "Home", char: "H", component: Home},
	{title: "Market", char: "M", component: Market},
	{title: "Settings", char: "S", component: Settings},
];

export default function PointApp () {
	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const CurrentComponent = TABS[currentTabIndex].component;

	return (
		<div className="bg-slate-100">

			<main className="">
				<Header {...{TABS, currentTabIndex, setCurrentTabIndex}} />
				<CurrentComponent />
				<Footer />
			</main>

		</div>
	);
}
