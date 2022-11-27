import React from 'react';

import Header from './Header/Header';
import Footer from './Footer/Footer';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';

import Account from './Content/Account';
import Home from './Content/Home';
import Market from './Content/Market';
import Recent from './Content/Recent';
import Settings from './Content/Settings';

const TABS = [
	{title: "Home", char: "H", component: Home},
	{title: "Recent", char: "R", component: Recent},
	{title: "Market", char: "M", component: Market},
	{title: "Account", char: "A", component: Account},
	{title: "Settings", char: "S", component: Settings},
];

export default function PointApp () {
	const [currentTabIndex, setCurrentTabIndex] = React.useState(0);
	const CurrentComponent = TABS[currentTabIndex].component;

	return (
		<div className="App flex bg-slate-100">
			<LeftSidebar {...{TABS, currentTabIndex, setCurrentTabIndex}} />

			<main className="grow bg-white">
				<Header />
				<CurrentComponent />
				<Footer />
			</main>

			<RightSidebar />
		</div>
	);
}
