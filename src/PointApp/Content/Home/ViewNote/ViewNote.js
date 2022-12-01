import AspectView from './AspectView';

import {Button} from '../../../Utils';



export default function ViewNote ({note, category, goTo, dbFuncs}) {
	return (
		<div>
			<header className="max-w-3xl mx-auto px-4 py-5">
				<section className="max-w-xl">
					<h4 className="text-green-800 cursor-pointer" onClick={() => goTo.Category(category.id)}>{category.title}</h4>
					<h1 className="py-3">{note.title || <span className="faded">No title</span>}</h1>
					<p>{note.description || <span className="faded">No description</span>}</p>
				</section>
			</header>

			<main className="max-w-3xl mx-auto px-4 py-4">
				<section className="max-w-xl py-4 space-y-8">
					{note.aspectIds.map(aspectId => <AspectView key={aspectId} {...{aspectId, dbFuncs}} />)}
				</section>
			</main>

			<footer className="max-w-3xl mx-auto px-4 py-4 space-x-4">
				<div>
					<Button onClick={goTo.Dashboard}>Home</Button>
					<Button onClick={() => goTo.Editor(note.id)}>Edit</Button>
				</div>
			</footer>
		</div>
	);
}
