
class Processor extends AudioWorkletProcessor {

  t = 0;
  dt = 1/sampleRate;

  strangeWave = (t:number) => {
    const ph1 = 220 * 2 * Math.PI * t;
    const ph2 = 330 * 2 * Math.PI * (t + 0.031*Math.sin(t*0.712));
    const ph3 = 440 * 2 * Math.PI * (t + 0.023*Math.sin(t*0.201));
    return Math.sin(ph1) + Math.sin(ph2) + Math.sin(ph3);
  }

  process(_inputs:Float32Array[][], outputs:Float32Array[][], _parameters:Record<string, Float32Array>) {

    const output = outputs[0][0];

    for(let i=0; i<output.length; i++) {
      output[i] = this.strangeWave(this.t);
      this.t += this.dt;
    }
    
    return true;
  }
}

registerProcessor('processor', Processor);