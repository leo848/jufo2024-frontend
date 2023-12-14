<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Particle } from '../physics/particle';
	import { Vec2 } from '../physics/vector';
	import { euclideanDist } from '../geom/dist';

	export let edges: [number[], number[]][];
	export let points: number[][];

	let wrapperDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0,
		height = 0;
	let callback: null | number = null;

	let particles: Particle[] = [];

	function render() {
		if (ctx == null) return;
		// ctx.translate(width / 2, height / 2)

		ctx.fillStyle = 'rgb(31 41 55)';
		ctx.fillRect(0, 0, width, height);

		applyForces();

		for (const particle of particles) {
			particle.update();
			particle.draw(ctx);
		}
	}

	$: if (particles.length) {
		for (let i = 0; i < points.length; i++) {
			if (particles[i]) particles[i].vector = points[i];
		}
	}

	onDestroy(() => callback && clearInterval(callback));

	function applyForces() {
		const center = new Vec2(width / 2, height / 2);
		for (const particle1 of particles) {
			// Zentrumskraft
			particle1.applyForce(center.sub(particle1.pos).setMag(0.005));
			for (const particle2 of particles) {
				if (particle1.pos.dist(particle2.pos) < 0.001) continue;
				let delta = particle2.pos.sub(particle1.pos);
				let displayDist = delta.mag();
				let trueDist = particle1.dist(particle2) * 20;

				const force = particle2.pos.sub(particle1.pos).mul(displayDist - trueDist);
				// Kraft hin zu Distanz wie in realem Graph
				particle1.applyForce(force.mul(0.00001));

				// Keine Überlappung
				// if (particle1.pos.dist(particle2.pos) < particle1.radius + particle2.radius) {
				// particle1.vel = particle1.vel.mul(-1)
				// particle1.applyForce(delta.mul(-0.001));
				// }
			}
		}
	}

	onMount(() => {
		width = canvas.width = wrapperDiv.offsetWidth;
		height = canvas.height = wrapperDiv.offsetHeight;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('could not get canvas context');
		ctx = context;

		for (let i = 0; i < points.length; i++) {
			particles.push(
				new Particle({
					radius: 20,
					name: i + 1 + '',
					vector: points[i],
					x: Math.random() * width,
					y: Math.random() * height
				})
			);
		}

		callback = setInterval(render, 60);
	});
</script>

<div class="w-full h-full" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} />
</div>
