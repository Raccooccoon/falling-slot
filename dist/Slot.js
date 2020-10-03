import { renderer } from './renderer';
export class Slot {
    constructor(name, index) {
        this.name = name;
        this.index = index;
        this.slotWidth = 236;
        this.slotHeight = 226;
        this.texture = PIXI.Texture.from(this.name);
        this.image = new PIXI.Sprite(this.texture);
        this.ticker = new PIXI.Ticker();
    }
    static getSlots() {
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
    static dropSlots() {
        for (let i = 0; i < Slot.slots.length; i++) {
            setTimeout(() => {
                Slot.slots[i].dropSlot();
                Slot.slots[i] = null;
            }, 30 * i);
        }
    }
    getSlot() {
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
        };
        this.ticker.add(animate);
        this.ticker.start();
    }
    dropSlot() {
        const animate = () => {
            this.image.y += 80;
            if (this.image.y > renderer.height) {
                this.ticker.remove(animate);
                Slot.stage.removeChild(this.image);
            }
            renderer.render(Slot.stage);
        };
        this.ticker.add(animate);
        this.ticker.start();
    }
    rowPosition(row) {
        return renderer.height - this.slotHeight * row;
    }
}
Slot.stage = new PIXI.Container();
Slot.slots = [];
Slot.columns = 5;
Slot.raws = 3;
Slot.disabled = false;
//# sourceMappingURL=Slot.js.map