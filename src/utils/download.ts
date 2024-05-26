export function download(filename: string, text: string) {
	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}

export function upload(accept: string, callback: (content: string) => void) {
	const element = document.createElement('input');
	element.accept = accept;
	element.type = 'file';
	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	element.addEventListener('input', (_) => {
		if (!element.files) return;
		const file = element.files[0];

		const fileReader = new FileReader();

		fileReader.readAsText(file);

		fileReader.addEventListener('load', (_) => {
			const result: string = fileReader.result as string;
			callback(result);
		});
	});
}
