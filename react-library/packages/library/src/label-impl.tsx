export type Label = {
  getWidth: () => number,
  getHeight: () => number,
};

class LabelImpl {
  declare label: Label;

  constructor(label: Label) {
    this.label = label;
  }

  getSize(): number {
    return this.label.getWidth() * this.label.getHeight();
  }
}

export default LabelImpl;
