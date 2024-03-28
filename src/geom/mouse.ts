export function mouseInBounds(
	[mouseX, mouseY]: [number, number],
	[left, top]: [number, number],
	[right, bottom]: [number, number]
) {
	return mouseX > left && mouseX < right && mouseY > top && mouseY < bottom;
}
