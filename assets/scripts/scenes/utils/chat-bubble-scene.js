import Phaser from '../../lib/phaser.js';
import { SCENE_KEYS } from '../scene-keys.js';

export class ChatBubbleScene extends Phaser.Scene {
  /** @type {Phaser.Scene} */
  #currenScene;
  /** @type {Phaser.GameObjects.Text} */
  #text;
  /** @type {Phaser.GameObjects.Container} */
  #container;
  /** @type {import('../../types/chat-flow.model.js').ChatFlowItem[]} */
  #messageFlow;
  /** @type {number} */
  #messageFlowCurrentIndex;
  /** @type {boolean} */
  shown;

  constructor() {
    super({
      key: SCENE_KEYS.CHAT_BUBBLE_SCENE,
    });
  }

  create(data) {
    this.#messageFlowCurrentIndex = 0;
    this.#currenScene = data.currentScene;
    this.#messageFlow = data.messageFlow;

    this.setup();

    if (this.#messageFlow.length) {
      this.displayText(this.#messageFlow[0]);
    } else {
      this.destroy();
    }
  }

  update() {
    const spaceKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE
    );

    const shiftKey = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SHIFT
    );

    if (
      Phaser.Input.Keyboard.JustDown(spaceKey) ||
      Phaser.Input.Keyboard.JustDown(shiftKey)
    ) {
      this.#messageFlowCurrentIndex++;
      if (
        typeof this.#messageFlow[this.#messageFlowCurrentIndex] == 'undefined'
      ) {
        this.destroy();
      } else {
        this.displayText(this.#messageFlow[this.#messageFlowCurrentIndex]);
      }
    }
  }

  setup() {
    this.#currenScene.scene.pause();
    this.#currenScene.scene.sendToBack();
    this.#createChatContainer();
    this.#hideChatBubble();
  }

  displayText(flowItem, speed = 50) {
    this.#showChatBubble();
    this.#text.setText(''); // Clear existing text

    let i = 0;
    this.time.addEvent({
      delay: speed,
      repeat: flowItem.text.length - 1,
      callback: () => {
        this.#text.setText(this.#text.text + flowItem.text[i]);
        i++;
      },
    });
  }

  destroy() {
    this.#container.destroy();
    this.#currenScene.scene.bringToTop();
    this.#currenScene.scene.resume();
    this.scene.stop();
  }

  #createChatContainer() {
    const width = 240;
    const height = 50;

    const gameHeight = this.scale.height;
    const x = (this.scale.width - width) / 2; // Center horizontally
    const y = gameHeight - height - 10; // Position at bottom

    // Create speech bubble background
    this.background = this.add.graphics();
    this.background.fillStyle(0x000000, 0.7); // Black background with opacity
    this.background.fillRoundedRect(x, y, width, height, 10);

    // Add border (white, 3px thick)
    this.background.lineStyle(1, 0xffffff, 1); // (thickness, color, alpha)
    this.background.strokeRoundedRect(x, y, width, height, 10);

    // Create text
    this.#text = this.add.text(x + 10, y + 10, '', {
      fontSize: '12px',
      // @ts-ignore
      fill: '#ffffff',
      wordWrap: { width: width - 20 },
    });

    // Group elements together
    this.#container = this.add.container(0, 0, [this.background, this.#text]);
  }

  #showChatBubble() {
    this.#container.setVisible(true);
    this.shown = true;
  }

  #hideChatBubble() {
    this.#container.setVisible(false);
    this.shown = false;
  }
}
