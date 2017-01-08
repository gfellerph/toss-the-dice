<template>
	<div class="dice" draggable @dragstart="onDragStart" :style="style">
		{{dice.lastToss}}
	</div>
</template>

<script>
	export default {
		name: 'Dice',
		props: {
			dice: Object
		},
		computed: {
			style() {
				return `background-color: ${this.dice.color}`;
			}
		},
		methods: {
			onDragStart(event) {
				event.dataTransfer.setData('text/dice-id', this.dice.id);
			},
		}
	}
</script>

<style>
	
</style>