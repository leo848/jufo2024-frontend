import {Vec2} from './vector';

export class Particle {
	pos: Vec2;
	vel: Vec2;
	acc: Vec2;

	vectorIdx: number;
	name: string;

	radius: number;

	constructor({
		radius,
		name,
		vectorIdx,
		x,
		y
	}: {
		radius?: number;
		name: string;
		vectorIdx: number;
		x: number;
		y: number;
	}) {
		this.name = name;
		this.vectorIdx = vectorIdx;
		this.pos = new Vec2(x, y);
		this.vel = Vec2.zero();
		this.acc = Vec2.zero();
		this.radius = radius ?? 20;
	}

	applyForce(force: Vec2) {
		this.acc = this.acc.add(force);
	}

	update({friction}: {friction?: number}) {
		this.vel = this.vel.add(this.acc);
		this.pos = this.pos.add(this.vel);

		this.vel = this.vel.mul(friction ?? 0.985);
		this.acc = Vec2.zero();
	}

	draw(
		ctx: CanvasRenderingContext2D,
		options: {highlight: boolean; dark: boolean} = {highlight: false, dark: false}
	): [[number, number], [number, number]] {
		ctx.lineWidth = 2;
		ctx.fillStyle =
			options.highlight === options.dark ? 'rgba(80%, 80%, 80%, 40%)' : 'rgba(25%, 25%, 25%, 40%)';
		ctx.strokeStyle =
			options.highlight === options.dark ? 'rgba(25%, 25%, 25%, 40%)' : 'rgba(80%, 80%, 80%, 40%)';

		const fontSize = 14;
		const textWidth = Math.max(fontSize, ctx.measureText(this.name).width + 10);

		ctx.beginPath();
		ctx.roundRect(this.pos.x, this.pos.y - 5, textWidth + 10, fontSize + 10, fontSize);
		ctx.stroke();
		ctx.fill();

		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'middle';
		ctx.font = fontSize + 'px Inter, sans-serif';

		ctx.beginPath();
		ctx.fillStyle = options.highlight === options.dark ? '#444' : '#ccc';
		ctx.ellipse(this.pos.x, this.pos.y, 4, 4, 0, 0, Math.PI * 2);
		ctx.fillStyle = options.highlight === options.dark ? 'black' : 'white';
		ctx.ellipse(this.pos.x, this.pos.y, 3, 3, 0, 0, Math.PI * 2);
		ctx.fill();

		ctx.fillText(this.name, this.pos.x + 10, this.pos.y + 2);

		return [
			[this.pos.x, this.pos.y - 5],
			[this.pos.x + textWidth + 10, this.pos.y + fontSize + 10]
		];
	}
}
