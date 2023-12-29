import './style.css'
import { Button, InfoSlider, SwitchButton } from './interface';
import { Sound } from './sound';

Button.initialize(10, 10, 10);

const sound = new Sound;

let volumeSlider: InfoSlider;

const buttonStart = new SwitchButton('start');

buttonStart.onPush( async () => {

  const buttonMute = new SwitchButton('mute');
  buttonMute.onPush(() => sound.mute(buttonMute.on));

  volumeSlider = new InfoSlider(0, 1, 0.01, 0.1, 'volume: ', 2, '', 200, document.body);
  volumeSlider.onSlide(() => sound.setVolume(volumeSlider.value));
  volumeSlider.setId('volumeSlider');

  await sound.init();
  sound.setVolume(volumeSlider.value);
  sound.play();
  buttonStart.button.disabled = true;

});



