/* eslint-disable no-use-before-define */
/* eslint-disable no-shadow */

export default function createProgressBar(uploadFormSel, progressFillSel, progressTextSel, serverURL) {
	const uploadForm = document.querySelector(uploadFormSel);
	const progressFill = document.querySelector(progressFillSel);
	const progressText = document.querySelector(progressTextSel);

	uploadForm.addEventListener('submit', uploadFile);

	function uploadFile(e) {
		e.preventDefault();
		const formDATA = new FormData(uploadForm);

		const xhr = new XMLHttpRequest();

		xhr.open('POST', serverURL);
		xhr.upload.addEventListener('progress', e => {
			const percent = e.lengthComputable ? (e.loaded / e.total) * 100 : 0;

			progressFill.style.width = `${percent.toFixed(0)}%`;
			progressText.textContent = `${percent.toFixed(0)}%`;
		});

		xhr.send(formDATA);
	}
}
