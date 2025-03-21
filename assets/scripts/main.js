import Phaser from './lib/phaser.js';
import { WorldScene } from './scenes/world-scene.js';
import { PreloadScene } from './scenes/preload-scene.js';
import { SCENE_KEYS } from './scenes/scene-keys.js';

const game = new Phaser.Game({
  type: Phaser.CANVAS,
  pixelArt: false,
  scale: {
    parent: 'game-container',
    width: 256,
    height: 224,
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [PreloadScene],
  backgroundColor: '#FFFFFF',
});

game.scene.add(SCENE_KEYS.WORLD_SCENE, WorldScene);
