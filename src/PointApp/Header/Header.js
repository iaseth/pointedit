


export default function Header ({
	PRODUCTION, TABS,
	currentTabIndex, setCurrentTabIndex
}) {
	const tabItems = TABS.map((t, k) => {
		if (PRODUCTION && t.debug) {
			return true;
		}

		const current = k === currentTabIndex;
		let className = "pt-1";
		className += current ? " bg-slate-50" : " hover:bg-slate-300 cursor-pointer";

		return (
			<div key={k} className={className} onClick={() => current ? null : setCurrentTabIndex(k)}>
				<h4 className="px-2 py-4">{t.title}</h4>
			</div>
		);
	});

	return (
		<header className="bg-slate-200 select-none">
			<div className="flex ch:grow ch:basis-0 text-center max-w-3xl mx-auto">
				{tabItems}
			</div>
		</header>
	);
}
