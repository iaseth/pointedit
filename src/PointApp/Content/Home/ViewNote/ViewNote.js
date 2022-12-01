import {Button} from '../../../Utils';



export default function ViewNote ({note, category, goTo}) {
	return (
		<div>
			<header className="max-w-3xl mx-auto px-4 py-4">
				<h4 className="text-green-800 cursor-pointer" onClick={() => goTo.Category(category.id)}>{category.title}</h4>
			</header>

			<main className="max-w-3xl mx-auto px-4 py-4">
				<article>
					<section>
						<h1>{note.title}</h1>
						<p>{note.description}</p>
					</section>
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
