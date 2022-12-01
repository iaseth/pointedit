import {Grid} from './Grid';
import {CategoryBox} from './CategoryBox';



export function CategoryGrid ({notes, categories, goToCategory, title}) {
	const catItems = categories.map((category, k) => <CategoryBox key={k} {...{notes, category, goToCategory}} />);

	return (
		<div>
			<header>
				{title && <h3>{title}</h3>}
			</header>

			<main className="py-3">
				<Grid>
					{catItems}
				</Grid>
			</main>
		</div>
	);
}
