import { Img, View2D } from "@motion-canvas/2d";
import { all, beginSlide, createRef } from "@motion-canvas/core";
import aufgaben from "./assets/optionen/aufgaben.png";
import erklaeren from "./assets/optionen/erklaeren.png";
import recapping from "./assets/optionen/recapping.png";

export default function* (view: View2D) {
  const image1Anwendung = createRef<Img>();
  const image2Anwendung = createRef<Img>();
  const image3Anwendung = createRef<Img>();

  view.add(
    <>
      <Img src={aufgaben} width={500} opacity={0} ref={image1Anwendung} />
      <Img src={erklaeren} width={500} opacity={0} ref={image2Anwendung} scale={0.9} />
      <Img src={recapping} width={500} opacity={0} ref={image3Anwendung} />
    </>
  );

  yield* image1Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben1");
  yield* all(image1Anwendung().x(-600, 1), image1Anwendung().y(350, 1), image1Anwendung().scale(0.7, 1));

  yield* image2Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben2");
  yield* all(image2Anwendung().x(0, 1), image2Anwendung().y(350, 1), image2Anwendung().scale(0.65, 1));

  yield* image3Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben3");
  yield* all(image3Anwendung().x(600, 1), image3Anwendung().y(350, 1), image3Anwendung().scale(0.8, 1));

  yield* beginSlide("Cleanup1");
  yield* all(
    image1Anwendung().opacity(0, 1),
    image2Anwendung().opacity(0, 1),
    image3Anwendung().opacity(0, 1)
  );
  image1Anwendung().remove();
  image2Anwendung().remove();
  image3Anwendung().remove();
}
