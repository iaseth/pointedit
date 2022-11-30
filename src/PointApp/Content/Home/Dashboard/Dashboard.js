import {CategoryGrid} from '../HomeUtils';


// function RecentItems () {}
// function PinnedItems () {}

export default function Dashboard ({appdata, goToCategory}) {
	const topLevelCats = appdata.categories.filter(cat => !cat.parent);

	return (
		<div className="max-w-3xl mx-auto">
			<CategoryGrid {...{appdata, goToCategory}} categories={topLevelCats} />
		</div>
	);
}
