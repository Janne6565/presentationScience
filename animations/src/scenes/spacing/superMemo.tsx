import { Img, View2D } from "@motion-canvas/2d";
import { all, beginSlide, createRef } from "@motion-canvas/core";
import screenshot1 from "./assets/screenshots/image1.png";
import screenshot2 from "./assets/screenshots/image2.png";
import screenshot3 from "./assets/screenshots/image3.png";

export default function* (view: View2D) {
  yield* beginSlide("Screenshots");

  const screenshots = [screenshot3, screenshot2, screenshot1];

  const refs = screenshots.map(() => createRef<Img>());

  view.add(
    refs.map((ref, index) => (
      <Img ref={ref} src={screenshots[index]} width={300} opacity={0} />
    ))
  );

  refs[0]().x(0).y(50);
  refs[1]().x(-400).y(50);
  refs[2]().x(400).y(50);

  for (const ref of refs) {
    yield* ref().opacity(1, 1);
  }

  yield* beginSlide("Cleanup6");
  yield* all(...refs.map((ref) => ref().opacity(0, 1)));
  refs.forEach((ref) => ref().remove());
}
