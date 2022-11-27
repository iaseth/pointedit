


export default function Header ({TABS, currentTabIndex, setCurrentTabIndex}) {
	const tabItems = TABS.map((t, k) => {
		   const current = k === currentTabIndex;
		   let className = "pt-1";
		   className += current ? " bg-white" : " hover:bg-green-300 cursor-pointer";

		   return (
				   <div key={k} className={className} onClick={() => current ? null : setCurrentTabIndex(k)}>
						   <h4 className="px-4 py-4">{t.title}</h4>
				   </div>
		   );
	});

	return (
		<header className="bg-green-200 select-none">
			<div className="flex ch:grow ch:basis-0 text-center max-w-3xl mx-auto">
				{tabItems}
			</div>
		</header>
	);
}
