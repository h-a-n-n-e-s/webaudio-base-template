export class Button {

  button:HTMLButtonElement;

  private static height = 22; // px height of Button elements
  private static separation = 10; // separation width between buttons
  
  // measures for dynamic placement
  private static left = 0;
  private static top = 0;
  private static right = 0;

  private static idList: string[] = [];
  private static widthList: number[] = [];

  constructor(name:string) {

    this.button = document.createElement('button');
    this.button.id = name.replace(/\s+/g,'')+'But'+String(Button.idList.length);
    this.button.innerHTML = name;
    this.button.style.left = '0px'; // has to be set here already, otherwise button text line break o_O ?!?
    document.body.appendChild(this.button);

    Button.idList.push(this.button.id);
    
    // make width multiple of 10px
    const width = (name.length+1)*10; // for 16px mono font
    this.button.style.width = String(width)+'px';
    Button.widthList.push(width);

    // dynamic placement
    if (Button.left + width > window.innerWidth - Button.right) {
      Button.left = Button.separation; // set back
      Button.top += Button.height + Button.separation; // new row
    }
    this.button.style.left = String(Button.left)+'px';
    this.button.style.top = String(Button.top)+'px';
    Button.left += width + Button.separation;
  }

  static initialize(left:number, top:number, right:number) {

    Button.left = left;
    Button.top = top;
    Button.right = right;

    window.addEventListener('resize', () => {
      let l = left;
      let t = top;
      for (let i=0; i<Button.idList.length; i++) {
        const w = Button.widthList[i];
        if ( l + w > window.innerWidth - right ) {
          l = Button.separation;
          t += Button.height + Button.separation;
        }
        const but = document.getElementById(Button.idList[i]);
        but!.style.left = String(l)+'px';
        but!.style.top = String(t)+'px';
        l += w + Button.separation;
      }
    });
  }

  click = () => this.button.dispatchEvent(new Event('click'));
}

export class SwitchButton extends Button {

  on = false; // button state
  func = () => {}; // optional function
  
  constructor(name:string) {

    super(name)
    this.button.className = 'switchButtonOff';

    this.button.addEventListener('click', () => {

      // invert colors
      if (!this.on) this.button.className = 'switchButtonOn';
      else this.button.className = 'switchButtonOff';

      // switch 'on' state
      this.on = !this.on;

      // optional callback function
      this.func();

    }, false);
  }

  onPush = (func:()=>void) => this.func = func;
}


export class PushButton extends Button {

  constructor(name:string) {
    super(name)
  }

  onPush = (func:()=>void) => this.button.addEventListener('click', () => {func();}, false);
}

///////////////////////////////////////////////////////////////////////////////

export class InfoSlider {
  
  value:number;

  private element:HTMLDivElement; // div container for text and slider
  text:HTMLParagraphElement;
  private slider:HTMLInputElement;
  private prefix;
  private digits;
  private suffix;

  constructor(min:number, max:number, step:number, init:number, prefix:string, digits:number, suffix:string, width:number, parent:HTMLElement) {

    this.prefix = prefix;
    this.digits = digits;
    this.suffix = suffix;

    this.element = document.createElement('div');
    this.element.className = 'sliderContainer';
    this.element.style.width = String(width)+'px';

    this.text = document.createElement('p');
    this.text.innerHTML = prefix+init.toFixed(digits)+suffix;
    this.element.appendChild(this.text);

    this.slider = document.createElement('input');
    this.slider.type = 'range';
    this.slider.className = 'slider';
    this.slider.min = String(min);
    this.slider.max = String(max);
    this.slider.step = String(step);
    this.slider.value = String(init);
    this.element.appendChild(this.slider);

    this.value = init;

    parent.appendChild(this.element);
  }

  onSlide = (func:()=>void) => {
    this.slider.addEventListener('input', () => {
      this.value = this.slider.valueAsNumber;
      this.text.innerHTML = this.prefix+this.value.toFixed(this.digits)+this.suffix;
      func();
    });
  }

  setId = (id:string) => this.element.id = id;
}

