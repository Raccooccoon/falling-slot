import { renderer } from './renderer';

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

  static stage: PIXI.Container = new PIXI.Container();
  static slots: Array<Slot | null> = [];
  static columns: number = 5;
  static raws: number = 3;
  static disabled: boolean = false;
  
  public static getSlots(): void {
    this.disabled = true;
    const delay = Slot.slots.length;
    if (Slot.slots.length) {
      Slot.dropSlots();
    }
    for (let i = 0; i < Slot.columns * Slot.raws; i++) {
      setTimeout(() => {
        const slot = new Slot(`../assets/symbols/symbol_${Math.floor(Math.random() * 8) + 1}.png`, i);
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
    Slot.stage.addChild(this.image);

    const animate = () => {
      this.image.y += 80;
      if (this.index < Slot.columns && this.image.y >= this.rowPosition(1)) {
        this.image.y = this.rowPosition(1);
        this.ticker.remove(animate);
      }
      else if (this.index >= Slot.columns && this.index < Slot.columns * 2 && this.image.y >= this.rowPosition(2)) {
        this.image.y = this.rowPosition(2);
        this.ticker.remove(animate);
      }
      else if (this.index >= Slot.columns * 2 && this.index < Slot.columns * 3 && this.image.y >= this.rowPosition(3)) {
        this.image.y = this.rowPosition(3);
        this.ticker.remove(animate);
      }
      renderer.render(Slot.stage);
    }

    this.ticker.add(animate);
    this.ticker.start();
  }
  
  private dropSlot(): void {
    const animate = () => {
      this.image.y += 80;
      if (this.image.y > renderer.height) {
        this.ticker.remove(animate);
        Slot.stage.removeChild(this.image);
      }
      renderer.render(Slot.stage);
    }
    this.ticker.add(animate);
    this.ticker.start();
  }

  private rowPosition(row: number): number {
    return renderer.height - this.slotHeight * row;
  }
}
