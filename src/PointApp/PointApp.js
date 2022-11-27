import Header from './Header/Header';
import Footer from './Footer/Footer';
import LeftSidebar from './LeftSidebar/LeftSidebar';
import RightSidebar from './RightSidebar/RightSidebar';
import Content from './Content/Content';



export default function PointApp () {

	return (
		<div className="App flex bg-slate-100">
			<LeftSidebar />

			<main className="grow bg-white">
				<Header />
				<Content />
				<Footer />
			</main>

			<RightSidebar />
		</div>
	);
}
