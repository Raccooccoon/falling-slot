import { Howl } from '../node_modules/howler/dist/howler.js';

export const slotSound = (n: number) => new Howl({
  src: [`../assets/sounds/Reel_Stop_${n}.mp3`]
});

export const buttonSound = new Howl({
  src: ['../assets/sounds/Start_Button.mp3']
});
