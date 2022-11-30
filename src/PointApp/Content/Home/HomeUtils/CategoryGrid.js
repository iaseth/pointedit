import {CategoryBox} from './CategoryBox';


export function CategoryGrid ({appdata, goToCategory}) {
	const catItems = appdata.categories.filter(cat => !cat.parent).map((category, k) => <CategoryBox key={k} {...{appdata, category, goToCategory}} />);

	return (
		<div className="grid grid-cols-3">
			{catItems}
		</div>
	);
}
