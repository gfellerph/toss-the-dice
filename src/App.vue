<template>
  <div id="app" class="toss-the-dice">
    <div class="dices" @dragover="onTemplatesDragOver" @drop="removeDice">
      <template-dice-component v-for="eyes in templateDices" :eyes="eyes"/>
    </div>
    <div @drop="addDice" @dragover="onPlaygroundDragOver" class="playground">
      <button @click="toss">toss</button>
      <ul>
        <li v-for="dice in dices" @click="chooseColor(dice)">
          <dice-component :dice="dice" />
        </li>
      </ul>
      <p><strong>{{sum}}</strong></p>
      <color-picker-component ref="colorpicker" />
    </div>
  </div>
</template>

<script>
import DiceComponent from 'components/dice';
import TemplateDiceComponent from 'components/templateDice';
import ColorPickerComponent from 'components/colorPicker';
import Dice from 'models/dice';

export default {
  name: 'app',
  data() {
    return {
      dices: [],
      templateDices: [6, 20],
      settingColor: false,
    }
  },
  components: {
    DiceComponent,
    TemplateDiceComponent,
    ColorPickerComponent,
  },
  computed: {
    sum() {
      var sum = 0;
      for (var i = 0; i < this.dices.length; i++) {
        sum += this.dices[i].lastToss;
      }
      return sum;
    }
  },
  methods: {
    addDice(event) {
      this.dices.push(new Dice(event.dataTransfer.getData('text/dice-eyes')));
    },
    removeDice(event) {
      const diceIdToRemove = event.dataTransfer.getData('text/dice-id');
      this.dices = this.dices.filter(dice => dice.id != diceIdToRemove);
    },
    toss() {
      for (var i = 0; i < this.dices.length; i++) {
        this.dices[i].toss();
      }
    },
    onTemplatesDragOver(event) {
      if (!event.dataTransfer.types.indexOf('text/dice-id')) {
        event.preventDefault();
      }
    },
    onPlaygroundDragOver(event) {
      if (!event.dataTransfer.types.indexOf('text/dice-eyes')) {
        event.preventDefault();
      }
    },
    chooseColor(dice) {
      this.$refs.colorpicker.pickColor()
        .then(color => {
          dice.color = color;
        });
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
    margin: 0;
  }

  .toss-the-dice {
    min-height: 100%;
    display: flex;
    flex-direction: column;
  }

  .dices {

  }

  .playground {
    flex: 1 0 80%;
    background: grey;
  }

  .dice {
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid black;
    background: white;
    border-radius: 5px;
  }
</style>
