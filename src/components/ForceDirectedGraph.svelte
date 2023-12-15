<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Particle } from '../physics/particle';
	import { Vec2, type NamedVector } from '../physics/vector';

	export let edges: [number, number][]; // indices
	export let vectors: NamedVector[];

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

		const totalAcc = particles.map((p) => p.acc.mag()).reduce((a, b) => a + b);

		for (const particle of particles) {
			particle.update();
		}

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 3;
		for (const [fromIdx, toIdx] of edges) {
			ctx.moveTo(particles[fromIdx].pos.x, particles[fromIdx].pos.y);
			ctx.lineTo(particles[toIdx].pos.x, particles[toIdx].pos.y);
			ctx.stroke();
		}

		for (const particle of particles) {
			particle.draw(ctx);
		}

		const totalVel = particles.map((p) => p.vel.mag()).reduce((a, b) => a + b);

		ctx.textAlign = 'left';
		ctx.textBaseline = 'hanging';
		const energy = (totalVel + totalAcc * 10);

		ctx.fillText(energy.toFixed(1), 10, 10);
	}

	$: if (particles.length) {
		for (let i = 0; i < vectors.length; i++) {
			if (particles[i]) {
				if (particles[i].name != vectors[i].name) {
					fullParticleUpdate();
					break;
				}
				particles[i].vector = vectors[i].inner;
			} else {
				fullParticleUpdate();
				break;
			}
		}
	}

	function fullParticleUpdate() {
		let oldParticles = particles;
		particles = [];
		for (let i = 0; i < vectors.length; i++) {
			let { x, y } = oldParticles.find((p) => p.name == vectors[i].name)?.pos ?? {
				x: Math.random() * width,
				y: Math.random() * height
			};
			particles.push(
				new Particle({
					radius: 20,
					name: vectors[i].name,
					vector: vectors[i].inner,
					x,
					y
				})
			);
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

				const factor = (displayDist - trueDist);
				const force = particle2.pos.sub(particle1.pos).mul(factor);
				// Kraft hin zu Distanz wie in realem Graph
				particle1.applyForce(force.mul(0.00003));

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

		fullParticleUpdate();
		callback = setInterval(render, 60);
	});
</script>

<div class="w-full h-full" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} />
</div>
