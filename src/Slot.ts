import { renderer, stage } from './view';
import { slotSound, buttonSound } from './sounds';

export class Slot {
  name: string;
  index: number;
  slotWidth: number;
  slotHeight: number;
  texture: PIXI.Texture;
  image: PIXI.Sprite;
  ticker: PIXI.Ticker;

  constructor(name: string, index: number) {
    this.name = name;
    this.index = index;
    this.slotWidth = 236;
    this.slotHeight = 226;
    this.texture = PIXI.Texture.from(this.name);
    this.image = new PIXI.Sprite(this.texture);
    this.ticker = new PIXI.Ticker();
  }

  static slots: (Slot | null)[] = [];
  static columns: number = 5;
  static raws: number = 3;
  static disabled: boolean = false;
  
  public static getSlots(): void {
    buttonSound.play();
    buttonSound.duration(1000);
    this.disabled = true;
    const delay = Slot.slots.length;
    if (Slot.slots.length) {
      Slot.dropSlots();
    }
    for (let i = 0; i < Slot.columns * Slot.raws; i++) {
      setTimeout(() => {
        const slot = new Slot(`../assets/images/symbols/symbol_${Math.floor(Math.random() * 8) + 1}.png`, i);
        Slot.slots[i] = slot;
        slot.getSlot();
        if (i === Slot.columns * Slot.raws - 1) {
          this.disabled = false;
        }
      }, 30 * (delay + i));
    }
  }

  private static dropSlots(): void {
    for (let i = 0; i < Slot.slots.length; i++) {
      setTimeout(() => {
        Slot.slots[i].dropSlot();
        Slot.slots[i] = null;
      }, 30 * i);
    }
  }
    
  private getSlot(): void {
    this.image.x = this.slotWidth * (this.index % Slot.columns);
    this.image.y = -this.slotHeight;
    stage.addChild(this.image);

    const animate = () => {
      this.image.y += 80;
      if (this.index < Slot.columns && this.image.y >= this.rowPosition(1)) {
        this.slotStop(animate, 1);
      }
      else if (this.index >= Slot.columns && this.index < Slot.columns * 2 && this.image.y >= this.rowPosition(2)) {
        this.slotStop(animate, 2);
      }
      else if (this.index >= Slot.columns * 2 && this.index < Slot.columns * 3 && this.image.y >= this.rowPosition(3)) {
        this.slotStop(animate, 3);
      }
      renderer.render(stage);
    }
    this.ticker.add(animate);
    this.ticker.start();
  }
  
  private dropSlot(): void {
    const animate = () => {
      this.image.y += 80;
      if (this.image.y > renderer.height) {
        this.ticker.remove(animate);
        stage.removeChild(this.image);
      }
      renderer.render(stage);
    }
    this.ticker.add(animate);
    this.ticker.start();
  }

  private rowPosition(row: number): number {
    return renderer.height - this.slotHeight * row;
  }

  private slotStopSound(): void {
    const sound = slotSound(Math.floor(Math.random() * 5) + 1);
    sound.play();
    sound.duration(1000);
  }

  private slotStop(animateFunc: () => void, row: number): void {
    this.image.y = this.rowPosition(row);
    this.ticker.remove(animateFunc);
    this.slotStopSound();
  };
}
