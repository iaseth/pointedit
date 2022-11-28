import {Button} from '../../../Utils';



export default function Category ({
	category, goToDashboard, goToCategory, goToEditor, goToViewer
}) {

	return (
		<div>
			<header>
				<div>
					<Button onClick={goToDashboard}>Back</Button>
				</div>

				<h2 className="py-5">Category</h2>
				<p>{category.title}</p>
			</header>

			<footer className="py-4 space-x-4">
				<Button onClick={() => goToEditor()}>Add note</Button>
			</footer>
		</div>
	);
}
