import { Vec2 } from './vector';

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

	update({ friction }: { friction?: number }) {
		this.vel = this.vel.add(this.acc);
		this.pos = this.pos.add(this.vel);

		this.vel = this.vel.mul(friction ?? 0.985);
		this.acc = Vec2.zero();
	}

	draw(ctx: CanvasRenderingContext2D) {
		ctx.lineWidth = 2;
		ctx.fillStyle = '#444';
		ctx.strokeStyle = '#ccc';

		const fontSize = 18;
		const textWidth = Math.max(fontSize, ctx.measureText(this.name).width + 10);

		ctx.beginPath();
		ctx.roundRect(this.pos.x, this.pos.y-5, textWidth + 10, fontSize + 10, fontSize);
		ctx.stroke();
		ctx.fill();

		// ctx.textAlign = 'center';
		// ctx.textBaseline = 'middle';
		ctx.font = fontSize + 'px sans-serif';
		ctx.fillStyle = 'white';
		ctx.fillText(this.name, this.pos.x + 10, this.pos.y + 2);
	}
}
