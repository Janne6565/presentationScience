import { Img, Line, Spline, View2D } from "@motion-canvas/2d";
import { all, beginSlide, createRef } from "@motion-canvas/core";
import citeImg from "./assets/retrievalCite.png";
import citeImg2 from "./assets/retrievalFolgen.png";

export default function* (view: View2D) {
  const cite = createRef<Img>();
  view.add(<Img ref={cite} src={citeImg} width={400} opacity={0} />);
  yield* cite().opacity(1, 1);

  const arrow = createRef<Spline>();
  view.add(
    <Spline
      points={[
        [-100, 0],
        [100, 0],
      ]}
      ref={arrow}
      stroke={"white"}
      lineWidth={40}
      endArrow
      arrowSize={20}
      end={0}
    />
  );

  yield* beginSlide("Folgen");

  yield* cite().x(-400, 1);
  yield* all(arrow().end(1, 1), arrow().arrowSize(50, 1));

  const image2 = createRef<Img>();
  view.add(<Img src={citeImg2} width={500} opacity={0} x={420} ref={image2} />);

  yield* image2().opacity(1, 1);

  yield* beginSlide("Cleanup");

  yield* all(
    cite().opacity(0, 1),
    arrow().start(1, 1),
    arrow().opacity(0, 1),
    image2().opacity(0, 1)
  );

  cite().remove();
}
