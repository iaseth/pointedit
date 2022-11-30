import {NoteGrid} from '../HomeUtils';
import {Button} from '../../../Utils';



export default function Category ({
	appdata, category,
	goToDashboard, goToCategory, goToEditor, goToViewer
}) {


	return (
		<div className="">
			<header className="max-w-3xl mx-auto px-4">
				<h2 className="py-2">{category.title}</h2>
				<p></p>
			</header>

			<main className="max-w-5xl mx-auto px-4 py-4">
				<NoteGrid {...{appdata, category, goToViewer}} />
			</main>

			<footer className="max-w-5xl mx-auto px-4 py-4 space-x-4">
				<div>
					<Button onClick={goToDashboard}>Back</Button>
					<Button onClick={() => goToEditor(-1)}>Add note</Button>
				</div>
			</footer>
		</div>
	);
}
