


const MAX_ASPECTS = 100;

export function getDefaultNoteObject (noteId, categoryId) {
	const note = {
		id: noteId,
		createdAt: Date.now(),
		modifiedAt: Date.now(),
		modifiedCount: 0,
		openedAt: Date.now(),
		openedCount: 0,

		// deleted notes show up in Trash
		deleted: false,
		deletedAt: 0,
		// hidden notes can be shown with a toggle
		hidden: false,
		hiddenAt: 0,
		// pinned notes are pinned at the top
		pinned: false,
		pinnedAt: 0,
		// completed notes cannot have empty fields
		completed: false,
		completedAt: 0,

		title: "",
		description: "",
		categoryId: categoryId,

		aspectIds: [],
		aspectId: MAX_ASPECTS * noteId
	};
	return note;
}