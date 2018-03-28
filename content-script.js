const colourScale = chroma
	.scale(['lightcoral', 'white', 'lightblue'])
	.domain([-1, 1]);

const observer = new MutationObserver(mutations => {
	mutations.forEach(({ addedNodes }) => {
		addedNodes.forEach(processNode);
	});
});

processNode(document);

observer.observe(document, {
	childList: true,
	subtree: true
});

function processNode(node) {
	const comments = node.querySelectorAll
		? node.querySelectorAll('.UFICommentActorAndBody')
		: [];
	comments.forEach(element => {
		const commentText = element.innerText;
		const { comparative } = sentiment(commentText);

		element.style.backgroundColor = colourScale(comparative).hex();
	});

	const posts = node.querySelectorAll
		? node.querySelectorAll('.userContentWrapper')
		: [];
	posts.forEach(element => {
		const postElement = element.querySelector('.userContent');
		if (postElement) {
			const postText = postElement.textContent;
			const { comparative } = sentiment(postText);
			const labels = element.querySelectorAll('._4arz, ._ipo');
			const backgroundColour = colourScale(comparative).hex();

			element.style.backgroundColor = backgroundColour;
			labels.forEach(label => {
				label.style.backgroundColor = backgroundColour;
			});
		}
	});
}

// This function is for testing
// eslint-disable-next-line no-unused-vars
function appendComparativeScore({ element, comparativeScore }) {
	const pre = document.createElement('pre');
	const textNode = document.createTextNode(
		`Comparative: ${comparativeScore}`
	);
	pre.appendChild(textNode);
	element.appendChild(pre);
}
