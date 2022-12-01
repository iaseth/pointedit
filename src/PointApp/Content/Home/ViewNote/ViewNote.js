import AspectView from './AspectView';

import {Button} from '../../../Utils';



export default function ViewNote ({note, category, goTo, dbFuncs}) {
	return (
		<div>
			<header className="max-w-3xl mx-auto px-4 py-4">
				<h4 className="text-green-800 cursor-pointer" onClick={() => goTo.Category(category.id)}>{category.title}</h4>
			</header>

			<main className="max-w-2xl mx-auto px-4 py-4">
				<article>
					<header>
						<h1>{note.title}</h1>
						<p>{note.description}</p>
					</header>

					<main className="py-6">
						<section>
							{note.aspectIds.map(aspectId => <AspectView key={aspectId} {...{aspectId, dbFuncs}} />)}
						</section>
					</main>
				</article>
			</main>

			<footer className="max-w-3xl mx-auto px-4 py-4 space-x-4">
				<div>
					<Button onClick={goTo.Dashboard}>Home</Button>
					<Button onClick={() => goTo.Category(category.id)}>{category.title}</Button>
					<Button onClick={() => goTo.Editor(note.id)}>Edit</Button>
				</div>
			</footer>
		</div>
	);
}
