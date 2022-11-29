import {Button} from '../../../Utils';



export default function ViewNote ({
	noteObject, category,
	goToDashboard, goToCategory, goToEditor
}) {

	return (
		<div>
			<header className="py-4 max-w-3xl mx-auto">
				<h2>ViewNote</h2>
			</header>

			<main className="max-w-3xl mx-auto">
				<article>
					<section>
						<h3>{noteObject.title}</h3>
						<p>{noteObject.description}</p>
					</section>
				</article>
			</main>

			<footer className="max-w-3xl mx-auto py-4 space-x-4">
				<div>
					<Button onClick={goToDashboard}>Home</Button>
					<Button onClick={() => goToCategory(category.id)}>{category.title}</Button>
					<Button onClick={() => goToEditor(noteObject.id)}>Edit</Button>
				</div>
			</footer>
		</div>
	);
}
