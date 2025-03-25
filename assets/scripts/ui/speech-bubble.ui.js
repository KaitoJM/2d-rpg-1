export default class SpeechBubble {
  /** @type {Phaser.Scene} */
  #scene;
  /** @type {Phaser.GameObjects.Text} */
  #text;
  /** @type {Phaser.GameObjects.Container} */
  #container;
  /** @type {boolean} */
  shown;

  /**
   *
   * @param {Phaser.Scene} scene
   * @param {string=} text
   * @param {number=} width
   * @param {number=} height
   */
  constructor(scene, text = '', width = 240, height = 50) {
    this.#scene = scene;
    this.shown = false;

    const gameHeight = scene.scale.height;
    const x = (scene.scale.width - width) / 2; // Center horizontally
    const y = gameHeight - height - 10; // Position at bottom

    // Create speech bubble background
    this.background = scene.add.graphics();
    this.background.fillStyle(0x000000, 0.7); // Black background with opacity
    this.background.fillRoundedRect(x, y, width, height, 10);

    // Create text
    this.#text = scene.add.text(x + 10, y + 10, '', {
      fontSize: '12px',
      // @ts-ignore
      fill: '#ffffff',
      wordWrap: { width: width - 20 },
    });

    // Group elements together
    this.#container = scene.add.container(0, 0, [this.background, this.#text]);

    // Hide initially
    this.hide();
  }

  show() {
    this.#container.setVisible(true);
    this.shown = true;
  }

  hide() {
    this.#container.setVisible(false);
    this.shown = false;
  }

  displayText(newText, speed = 50) {
    this.show();
    this.#text.setText(''); // Clear existing text

    let i = 0;
    this.#scene.time.addEvent({
      delay: speed,
      repeat: newText.length - 1,
      callback: () => {
        this.#text.setText(this.#text.text + newText[i]);
        i++;
      },
    });
  }

  destroy() {
    this.#container.destroy();
  }
}
