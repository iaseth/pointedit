import {Button} from '../../../Utils';



export default function ViewNote ({note, category, goTo}) {
	return (
		<div>
			<header className="py-4 max-w-3xl mx-auto">
				<h2>ViewNote</h2>
			</header>

			<main className="max-w-3xl mx-auto">
				<article>
					<section>
						<h3>{note.title}</h3>
						<p>{note.description}</p>
					</section>
				</article>
			</main>

			<footer className="max-w-3xl mx-auto py-4 space-x-4">
				<div>
					<Button onClick={goTo.Dashboard}>Home</Button>
					<Button onClick={() => goTo.Category(category.id)}>{category.title}</Button>
					<Button onClick={() => goTo.Editor(note.id)}>Edit</Button>
				</div>
			</footer>
		</div>
	);
}
