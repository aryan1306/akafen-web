export function tit(str: string) {
	let words = str.split("-");
	return words
		.map(function (word) {
			return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
		})
		.join(" ");
}
