<template>
	<div class="dice" draggable @dragstart="onDragStart" :style="style">
		{{dice.lastToss}}
	</div>
</template>

<script>
	function getContrastYIQ (hexstr) {
		hexstr = hexstr.replace('#', '');
		var r = parseInt(hexstr.substr(0,2),16);
		var g = parseInt(hexstr.substr(2,2),16);
		var b = parseInt(hexstr.substr(4,2),16);
		var yiq = ((r*299)+(g*587)+(b*114))/1000;
		return (yiq >= 128) ? 'black' : 'white';
	}

	export default {
		name: 'Dice',
		props: {
			dice: Object
		},
		computed: {
			style() {
				var textColor = getContrastYIQ(this.dice.color);
				return `background-color: ${this.dice.color}; color: ${textColor};`;
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