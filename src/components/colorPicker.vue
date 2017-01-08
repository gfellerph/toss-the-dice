<template>
	<div class="colorpicker" :style="showHide">
		<div class="color-wrapper">
			<div v-for="color in colors" class="color" :style="style(color)" @click="tryResolve(color)"></div>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				colors: [
					'#EF4444',
					'#FAA31B',
					'#FFF000',
					'#82C341',
					'#009F75',
					'#88C6ED',
					'#394BA0',
					'#D54799',
				],
				isShowing: false,
				resolveFunction: null,
			}
		},
		computed: {
		},
		methods: {
			style(color) {
				return `background-color: ${color};`;
			},
			tryResolve(color) {
				if (typeof this.resolveFunction === 'function') {
					this.isShowing = false;
					this.resolveFunction(color);
					this.resolveFunction = null;
				}
			},
			pickColor() {
				this.isShowing = true;
				return new Promise((resolve, reject) => {
					this.resolveFunction = resolve;
				});
			}
		}
	}
</script>

<style>
	.colorpicker {
		position: fixed;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0,0,0,0.75);
	}
	.color-wrapper {
		padding: 25px;
		background: white;
	}
	.color {
		float: left;
		width: 50px;
		height: 50px;
		border: 1px solid black;
	}

	.color + .color {
		margin-left: 1em;
	}
</style>