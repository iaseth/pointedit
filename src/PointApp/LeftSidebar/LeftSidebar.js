


export default function LeftSidebar ({TABS, currentTabIndex, setCurrentTabIndex}) {
	const tabItems = TABS.map((t, k) => {
		const current = k === currentTabIndex;
		let className = "pt-1";
		className += current ? " bg-green-500 text-white" : " bg-slate-100 hover:bg-green-300 cursor-pointer";

		return (
			<div key={k} className={className} onClick={() => current ? null : setCurrentTabIndex(k)}>
				<h4 className="px-4 py-4">{t.title}</h4>
			</div>
		);
	});

	return (
		<aside className="w-48 bg-white border-r-2 border-green-500">
			<div className="space-y-1">
				{tabItems}
			</div>
		</aside>
	);
}
