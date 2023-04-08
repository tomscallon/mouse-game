import Game from "./Game";
import { getCanvas } from "./canvas";
import BouncingSquaresScene from "./scene/BouncingSquaresScene";

const game = new Game(await getCanvas(), new BouncingSquaresScene(25));
game.start();
