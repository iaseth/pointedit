import {Button} from '../../../Utils';



export default function Category ({
	category, goToDashboard, goToCategory, goToEditor, goToViewer
}) {

	return (
		<div className="max-w-3xl mx-auto">
			<header className="px-4">
				<h2 className="py-5">{category.title}</h2>
				<p></p>
			</header>

			<main className="px-4 py-4">
				<h4>No notes to show.</h4>
			</main>

			<footer className="px-4 py-4 space-x-4">
				<div>
					<Button onClick={goToDashboard}>Back</Button>
					<Button onClick={() => goToEditor()}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
