import {CategoryBox} from './CategoryBox';


export function CategoryGrid ({appdata, categories, goToCategory}) {
	const catItems = categories.map((category, k) => <CategoryBox key={k} {...{appdata, category, goToCategory}} />);

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-6 py-4">
			{catItems}
		</div>
	);
}
