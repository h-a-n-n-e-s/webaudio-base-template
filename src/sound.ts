
export class Sound {

  private audioWorkletNode!: AudioWorkletNode;
  private context!: AudioContext;
  private gainNode!: GainNode;
  private volume!: number;
  private muted = false;

  init = async () => {

    this.context = new AudioContext();

    // using .ts for dev and .js for production build
    const suffix = import.meta.env.PROD ? '.js' : '.ts';
    await this.context.audioWorklet.addModule('src/processor'+suffix);

    this.audioWorkletNode = new AudioWorkletNode(this.context, 'processor');
    
    this.gainNode = this.context.createGain();
    this.gainNode.gain.value = 0;
    this.audioWorkletNode.connect(this.gainNode);

  }

  setVolume = (vol:number) => {
    this.volume = vol;
    if (!this.muted) this.gainNode.gain.linearRampToValueAtTime(vol, this.context.currentTime+0.1);
  }

  play = () => {
    this.gainNode.connect(this.context.destination);
  }

  mute = (mute:boolean) => {
    if (mute) {
      this.muted = true;
      this.gainNode.gain.linearRampToValueAtTime(0, this.context.currentTime+0.5);
    }
    else {
      this.muted = false;
      this.gainNode.gain.linearRampToValueAtTime(this.volume, this.context.currentTime+0.5);
    }
  };

}