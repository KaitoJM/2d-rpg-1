import Phaser from './lib/phaser.js';
import { WorldScene } from './scenes/world-scene.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';
import { JMHouseScene } from './scenes/amampacang/houses/jm-house-scene.js';

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: true,
  roundPixels: true,
  scale: {
    parent: 'game-container',
    width: 256,
    height: 224,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade', // ✅ Ensure physics is enabled!
    arcade: {
      gravity: { y: 0, x: 0 },
      debug: false,
    },
  },
  scene: [PreloadScene],
  backgroundColor: '#FFFFFF',
});

game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
game.scene.add(SCENE_KEYS.JM_HOUSE_SCENE, JMHouseScene);
