<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { Particle } from '../geom/particle';
	import { Vec2 } from '../geom/vector';
	import { mouseInBounds } from '../geom/mouse';
	import type { TrueDistanceType } from '../geom/dist';
	import { positiveAdjacencyMatrix } from '../graph/adjacency';
	import { tweened, type Tweened } from 'svelte/motion';
	import { quadIn, quadInOut } from 'svelte/easing';

	export let values: number[][];
	export let edges: [number, number][] = []; // indices
	export let names: string[];
	export let metric: TrueDistanceType = { norm: 'euclidean', invert: false };

	export let matrix: boolean = false; // whether values is matrix or vectors

	export let animDuration: number = 500;

	export let options: {
		speed?: number;
	} = {};

	export const actions = {
		freeze() {
			frozen = !frozen;
		}
	};

	$: forces = {
		friction: [0.95, 0.975, 0.985, 0.99, 0.995][5 - (options.speed ?? 3)],
		attraction: [0.001, 0.0001, 0.00003, 0.00001, 0.00001][5 - (options.speed ?? 3)],
		icePoint: [0.5, 0.9, 1, 5, 20][(options.speed ?? 3) - 1]
	};

	let adjMatrix: number[][];
	$: {
		if (matrix) {
			adjMatrix = values;
		} else {
			adjMatrix = positiveAdjacencyMatrix(values, metric);
		}
	}

	// [fromPos, fromIndex, toPos, toIndex];
	let displayEdges: Tweened<(() => [Vec2, number, Vec2, number])[]> = tweened(undefined, {
		easing: quadInOut,
		duration(a: (() => [Vec2, number, Vec2, number])[], b: (() => [Vec2, number, Vec2, number])[]) {
			if (a.length === b.length || a.length + 1 === b.length) return animDuration;
			else return 1000;
		},
		interpolate(
			a: (() => [Vec2, number, Vec2, number])[],
			b: (() => [Vec2, number, Vec2, number])[]
		) {
			const noAnim = () => b;
			if (b.length === 0) {
				return (tRaw: number) => {
					let t = quadIn(tRaw);
					return a.map((value) => {
						return () => [
							value()[0].add(
								value()[0]
									.delta(value()[2])
									.mul(t / 2)
							),
							value()[1],
							value()[2].add(
								value()[2]
									.delta(value()[0])
									.mul(t / 2)
							),
							value()[3]
						];
					});
				};
			}
			if (a.length + 1 === b.length) {
				return (t) => {
					const copy = b.slice();
					const last = copy[copy.length - 1];
					copy[copy.length - 1] = () => [
						last()[0],
						last()[1],
						last()[0].add(last()[0].delta(last()[2]).mul(t)),
						last()[3]
					];
					return copy;
				};
			}
			if (a.length === 0) {
				return (tRaw: number) => {
					let t = quadIn(tRaw);
					return b.map((value) => {
						return () => [
							value()[0].add(
								value()[0]
									.delta(value()[2])
									.mul(0.5 - t / 2)
							),
							value()[1],
							value()[2].add(
								value()[2]
									.delta(value()[0])
									.mul(0.5 - t / 2)
							),
							value()[3]
						];
					});
				};
			}
			if (a.length !== b.length) return noAnim;
			return (t) => {
				const key = (f: () => [Vec2, number, Vec2, number]) => {
					const [_fromPos, fromIdx, _toPos, toIdx] = f();
					return particles[fromIdx].name + '␞' + particles[toIdx].name;
				};
				const bSet = new Set(b.map(key));
				return a.map((valueA, index) => {
					const valueB = b[index];
					if (bSet.has(key(valueA))) return valueB;
					return () => [
						valueA()[0].add(valueA()[0].delta(valueB()[0]).mul(t)),
						valueB()[1],
						valueA()[2].add(valueA()[2].delta(valueB()[2]).mul(t)),
						valueB()[3]
					];
				});
			};
		}
	});
	let particleKey = 0;
	$: $displayEdges = edges.map(([indexFrom, indexTo]) => {
		return () => [particles[indexFrom]?.pos ?? 0, indexFrom, particles[indexTo]?.pos ?? 0, indexTo];
	});

	let wrapperDiv: HTMLDivElement;
	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D | null = null;
	let width = 0,
		height = 0;
	let mouse = { x: 0, y: 0 };
	let mousedown = false;
	let callback: null | NodeJS.Timeout = null;

	let particles: Particle[] = [];
	let averageTrueDist = 1;

	let selectedParticle: null | Particle = null;

	let frozen = false;
	$: width, height, edges, values, metric, (frozen = false);
	$: frozen = true;
	$: averageTrueDist = calculateAverageTrueDist(adjMatrix);

	function render() {
		if (ctx == null) return;
		// ctx.translate(width / 2, height / 2)

		ctx.fillStyle = 'rgb(31 41 55)';
		ctx.fillRect(0, 0, width, height);

		applyForces();

		const totalAcc = particles.map((p) => p.acc.mag()).reduce((a, b) => a + b, 0);

		particleKey++;
		if (!frozen) {
			for (const particle of particles) {
				if (particle !== selectedParticle || !mousedown) {
					particle.update({ friction: forces.friction });
				}
			}
		}

		ctx.strokeStyle = 'white';
		ctx.lineWidth = 3;
		for (const f of $displayEdges ?? []) {
			const [fromPos, _fromIdx, toPos, _toIdx] = f();
			ctx.moveTo(fromPos.x, fromPos.y);
			ctx.lineTo(toPos.x, toPos.y);
			ctx.stroke();
		}

		let selected = null;
		for (let i = particles.length - 1; i >= 0; i--) {
			const particle = particles[i];
			let [tl, br] = particle.draw(ctx);
			if (mouseInBounds([mouse.x, mouse.y], tl, br)) {
				selected = i;
			}
		}
		selectedParticle = null;
		if (selected !== null) {
			selectedParticle = particles[selected];
			selectedParticle.draw(ctx, { highlight: true });
		}

		const totalVel = particles.map((p) => p.vel.mag()).reduce((a, b) => a + b, 0);

		ctx.textAlign = 'left';
		ctx.textBaseline = 'hanging';
		const energy = ((totalVel + totalAcc * 10) / Math.max(particles.length, 10)) * 10;
		if (energy < forces.icePoint) frozen = true;

		if (!frozen) ctx.fillText(energy.toFixed(1), 10, 10);
	}

	$: for (let i = 0; i < values.length; i++) {
		if (particles[i]) {
			if (particles[i].name != names[i]) {
				fullParticleUpdate();
				break;
			}
			particles[i].vectorIdx = i;
		} else {
			fullParticleUpdate();
			break;
		}
	}

	function fullParticleUpdate(force: boolean = false) {
		let oldParticles = particles;
		particles = [];
		let minDim = Math.min(width, height);
		for (let i = 0; i < values.length; i++) {
			let { x, y } = oldParticles.find((p) => p.name == names[i] && !force)?.pos ?? {
				x: (Math.sin((i / values.length) * 2 * Math.PI) * minDim) / 3 + width / 2,
				y: (Math.cos((i / values.length) * 2 * Math.PI) * minDim) / 3 + height / 2
			};
			particles.push(
				new Particle({
					radius: 20,
					name: names[i],
					vectorIdx: i,
					x,
					y
				})
			);
		}
	}

	export function redraw() {
		frozen = false;
		fullParticleUpdate(true);
	}

	function calculateAverageTrueDist(matrix: number[][]) {
		let sum = 1;
		for (const col of matrix) {
			for (const entry of col) {
				sum += entry;
			}
		}
		const avg = sum / (values.length + 1) / values.length;
		return avg;
	}

	onDestroy(() => callback && clearInterval(callback));

	function applyForces() {
		if (frozen) return;
		const center = new Vec2(width / 2, height / 2);
		for (const particle1 of particles) {
			// Zentrumskraft
			particle1.applyForce(center.sub(particle1.pos).setMag(0.05));
			for (const particle2 of particles) {
				if (particle1.pos.dist(particle2.pos) < 0.001) continue;
				let delta = particle2.pos.sub(particle1.pos);
				let displayDist = delta.mag();
				let trueDist =
					(adjMatrix[particle1.vectorIdx] ?? [])[particle2.vectorIdx] ?? averageTrueDist;
				let trueDisplayDist = (trueDist * 160) / averageTrueDist;

				const factor = displayDist - trueDisplayDist;
				const force = particle2.pos.sub(particle1.pos).mul(factor);
				// Kraft hin zu Distanz wie in realem Graph
				particle1.applyForce(force.mul(forces.attraction));

				// Keine Überlappung
				// if (particle1.pos.dist(particle2.pos) < particle1.radius + particle2.radius) {
				// particle1.vel = particle1.vel.mul(-1)
				// particle1.applyForce(delta.mul(-0.001));
				// }
			}
		}
	}

	function mount() {
		if (callback) clearInterval(callback);
		width = canvas.width = wrapperDiv.offsetWidth;
		height = canvas.height = wrapperDiv.offsetHeight;
		const context = canvas.getContext('2d');
		if (!context) throw new Error('could not get canvas context');
		ctx = context;

		fullParticleUpdate(true);
		callback = setInterval(render, 60);

		wrapperDiv.addEventListener('resize', () => {
			mount();
			fullParticleUpdate(true);
		});

		canvas.addEventListener('mousemove', (evt) => {
			let pmouse = { x: evt.offsetX - mouse.x, y: evt.offsetY - mouse.y };
			mouse = { x: evt.offsetX, y: evt.offsetY };
			if (mousedown) {
				if (selectedParticle) {
					selectedParticle.pos.x += pmouse.x;
					selectedParticle.pos.y += pmouse.y;
					frozen = false;
				} else {
					particles.forEach((p) => {
						p.pos.x += pmouse.x;
						p.pos.y += pmouse.y;
					});
				}
			}
		});

		canvas.addEventListener('mousedown', () => (mousedown = true));
		canvas.addEventListener('mouseup', () => (mousedown = false));
		canvas.addEventListener('mouseout', () => (mousedown = false));
	}

	onMount(mount);
</script>

<div class="w-full h-full" bind:this={wrapperDiv}>
	<canvas bind:this={canvas} style={values.length === 0 ? 'display: none' : ''} />
	{#if values.length === 0}
		<div class="m-10 p-4 bg-gray-700 rounded">
			<div class="text-4xl text-white">Keine Vektoren hinzugefügt</div>
			<div class="text-xl">Füge durch Klicken auf "a" den ersten Vektor hinzu!</div>
		</div>
	{/if}
</div>
