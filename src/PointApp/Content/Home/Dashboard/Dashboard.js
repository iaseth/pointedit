import {CategoryGrid} from '../HomeUtils';


// function RecentItems () {}
// function PinnedItems () {}

export default function Dashboard ({appdata, goToCategory}) {

	return (
		<div className="max-w-3xl mx-auto">
			<CategoryGrid {...{appdata, goToCategory}} />
		</div>
	);
}
