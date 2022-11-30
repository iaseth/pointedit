import {CategoryBox} from '../HomeUtils';


// function RecentItems () {}
// function PinnedItems () {}

export default function Dashboard ({appdata, goToCategory}) {
	const catItems = appdata.categories.filter(cat => !cat.parent).map((category, k) => <CategoryBox key={k} {...{appdata, category, goToCategory}} />);

	return (
		<div className="max-w-3xl mx-auto">
			<div className="grid grid-cols-3">
				{catItems}
			</div>
		</div>
	);
}
