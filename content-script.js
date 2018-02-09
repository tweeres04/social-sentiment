const sentimentApiUrl = 'http://text-processing.com/api/sentiment/';

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
		? node.querySelectorAll('.userContent, .UFICommentActorAndBody')
		: [];
	comments.forEach(element => {
		const text = element.innerText;
		const sentimentResults = sentiment(text);
		const { comparative } = sentimentResults;
		const backgroundColor = colourScale(comparative);

		element.style.backgroundColor = colourScale(comparative).hex();
	});
}

function appendComparativeScore({ element, comparativeScore }) {
	const pre = document.createElement('pre');
	const textNode = document.createTextNode(
		`Comparative: ${comparativeScore}`
	);
	pre.appendChild(textNode);
	element.appendChild(pre);
}
