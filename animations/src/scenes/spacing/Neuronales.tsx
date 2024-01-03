import { Img, View2D } from "@motion-canvas/2d";
import mouseImg from "./assets/mouse.png";
import labyrinth from "./assets/labyrinth.png";
import { all, beginSlide, createRef } from "@motion-canvas/core";

export default function* (view: View2D) {
  view.fill("#1a1a1a");
  const mouseRef = createRef<Img>();
  view.add(
    <Img ref={mouseRef} src={mouseImg} width={500} y={100} opacity={0} />
  );

  const labyrinthRef = createRef<Img>();
  view.add(
    <Img ref={labyrinthRef} src={labyrinth} width={0} x={-500} y={100} />
  );

  yield* mouseRef().opacity(1, 1);

  yield* mouseRef().x(500, 1);

  yield* labyrinthRef().width(500, 1);

  yield* beginSlide("Cleanup20");
  yield* all(mouseRef().opacity(0, 1), labyrinthRef().opacity(0, 1));
}
