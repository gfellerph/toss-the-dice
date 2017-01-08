<template>
	<div class="dice" draggable v-on:dragstart="onDragStart">
		{{eyes}}
	</div>
</template>

<script>
	export default {
		name: 'templateDice',
		props: {
			eyes: Number
		},
		methods: {
			onDragStart(event) {
				event.dataTransfer.setData('text/dice-eyes', this.eyes);
			}
		}
	}
</script>

<style>
	
</style>