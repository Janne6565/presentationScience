import { Txt, View2D } from "@motion-canvas/2d";
import { beginSlide, createRef } from "@motion-canvas/core";

export default function* (view: View2D) {
  const text = createRef<Txt>();
  view.add(
    <Txt
      ref={text}
      text={"Schlussfolgerung"}
      fontSize={100}
      y={600}
      fill={"white"}
      opacity={1}
    />
  );

  yield* text().y(100, 2);

  yield* beginSlide("Cleanup4");
  yield* text().opacity(0, 1);

  text().remove();
}
