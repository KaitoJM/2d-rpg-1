import {
  BATTLE_ASSET_KEYS,
  BATTLE_BACKGROUNDS_ASSET_KEYS,
  HEALTH_BAR_ASSET_KEYS,
  MONSTER_ASSET_KEYS,
} from "../assets/asset-keys.js";
import { BattleMenu } from "../battle/ui/menu/battle-menu.js";
import { DIRECTION } from "../common/direction.js";
import Phaser from "../lib/phaser.js";
import { SCENE_KEYS } from "./scene-keys.js";

export class BattleScene extends Phaser.Scene {
  /** @type {BattleMenu} */
  #battleMenu;
  /** @type {Phaser.Types.Input.Keyboard.CursorKeys} */
  #cursorKeys;

  constructor() {
    super({
      key: SCENE_KEYS.BATTLE_SCENE,
    });
  }

  create() {
    this.add.image(0, 0, BATTLE_BACKGROUNDS_ASSET_KEYS.FOREST).setOrigin(0);
    this.add.image(764, 144, MONSTER_ASSET_KEYS.CARNODUSK, 0);
    this.add.image(256, 316, MONSTER_ASSET_KEYS.IGUANIGNITE, 0).setFlipX(true);

    const playerMonsterName = this.add.text(
      30,
      20,
      MONSTER_ASSET_KEYS.IGUANIGNITE,
      {
        color: "#7E3D3F",
        fontSize: "32px",
      }
    );

    this.add.container(556, 318, [
      this.add.image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKROUND).setOrigin(0),
      playerMonsterName,
      this.#createHealthBar(34, 34),
      this.add.text(playerMonsterName.width + 35, 23, "L5", {
        color: "#ED474B",
        fontSize: "28px",
      }),
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
      this.add
        .text(443, 80, "25/25", {
          color: "#7E3D3F",
          fontSize: "16px",
        })
        .setOrigin(1, 0),
    ]);

    const enemyMonsterName = this.add.text(
      30,
      20,
      MONSTER_ASSET_KEYS.CARNODUSK,
      {
        color: "#7E3D3F",
        fontSize: "32px",
      }
    );

    this.add.container(0, 0, [
      this.add
        .image(0, 0, BATTLE_ASSET_KEYS.HEALTH_BAR_BACKROUND)
        .setOrigin(0)
        .setScale(1, 0.8),
      enemyMonsterName,
      this.#createHealthBar(34, 34),
      this.add.text(enemyMonsterName.width + 35, 23, "L5", {
        color: "#ED474B",
        fontSize: "28px",
      }),
      this.add.text(30, 55, "HP", {
        color: "#FF6505",
        fontSize: "24px",
        fontStyle: "italic",
      }),
    ]);

    this.#battleMenu = new BattleMenu(this);
    this.#battleMenu.showMainBattleMenu();

    this.#cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    const wasSpaceKeyPressed = Phaser.Input.Keyboard.JustDown(
      this.#cursorKeys.space
    );

    if (wasSpaceKeyPressed) {
      this.#battleMenu.handlePlayerInput("OK");
      return;
    }

    if (Phaser.Input.Keyboard.JustDown(this.#cursorKeys.shift)) {
      this.#battleMenu.handlePlayerInput("CANCEL");
      return;
    }

    /** @type {import("../common/direction.js").Direction} */
    let selectedDirection = DIRECTION.NONE;
    if (this.#cursorKeys.left.isDown) {
      selectedDirection = DIRECTION.LEFT;
    } else if (this.#cursorKeys.right.isDown) {
      selectedDirection = DIRECTION.RIGHT;
    } else if (this.#cursorKeys.up.isDown) {
      selectedDirection = DIRECTION.UP;
    } else if (this.#cursorKeys.down.isDown) {
      selectedDirection = DIRECTION.DOWN;
    }

    if (selectedDirection != DIRECTION.NONE) {
      this.#battleMenu.handlePlayerInput(selectedDirection);
    }
  }

  /**
   *
   * @param {number} x
   * @param {number} y
   * @returns {Phaser.GameObjects.Container}
   */
  #createHealthBar(x, y) {
    const scaleY = 0.7;
    const leftCap = this.add
      .image(x, y, HEALTH_BAR_ASSET_KEYS.LEFT_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    const middleCap = this.add
      .image(leftCap.x + leftCap.width, y, HEALTH_BAR_ASSET_KEYS.MIDDLE_CAP)
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);
    middleCap.displayWidth = 360;
    const rightCap = this.add
      .image(
        middleCap.x + middleCap.displayWidth,
        y,
        HEALTH_BAR_ASSET_KEYS.RIGHT_CAP
      )
      .setOrigin(0, 0.5)
      .setScale(1, scaleY);

    return this.add.container(x, y, [leftCap, middleCap, rightCap]);
  }
}
