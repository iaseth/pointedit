import {Grid} from './Grid';
import {CategoryBox} from './CategoryBox';



export function CategoryGrid ({appdata, categories, goToCategory}) {
	const catItems = categories.map((category, k) => <CategoryBox key={k} {...{appdata, category, goToCategory}} />);

	return (
		<Grid>
			{catItems}
		</Grid>
	);
}
