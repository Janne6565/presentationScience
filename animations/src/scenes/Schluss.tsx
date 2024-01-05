import { Img, Txt, makeScene2D } from "@motion-canvas/2d";
import { beginSlide, createRef, waitFor } from "@motion-canvas/core";
import anki from "./assets/anki.png";
import brainscape from "./assets/brainscape.png";

export default makeScene2D(function* (view) {
  view.fill("#1a1a1a");
  const text = createRef<Txt>();

  view.add(
    <Txt
      ref={text}
      fontFamily={"Roboto"}
      text={"Was ihr mitnehmen solltet"}
      fontSize={100}
      fill={"white"}
      opacity={0}
    />
  );

  yield* text().opacity(1, 1);

  yield* beginSlide("Schluss");

  yield* text().y(-400, 1);

  const image1 = createRef<Img>();
  const image2 = createRef<Img>();

  view.add(<Img ref={image1} src={anki} width={500} opacity={0} y={100} />);

  view.add(
    <Img
      ref={image2}
      src={brainscape}
      width={500}
      opacity={0}
      y={50}
      fill={"white"}
      stroke={"gray"}
      lineWidth={10}
    />
  );

  yield* image1().opacity(1, 1);

  yield* beginSlide("Anki");

  yield* image1().opacity(0, 1);
  image1().remove();

  yield* image2().opacity(1, 1);

  yield* beginSlide("Quellen");

  yield* image2().opacity(0, 1);
  image2().remove();

  const quellenText = createRef<Txt>();
  view.add(
    <Txt
      ref={quellenText}
      fontFamily={"Roboto"}
      text={`
      - TU München: Kognitives Training bei Alzheimer-Patienten unter Anwendung der "Spaced Retrieval Technik" - https://mediatum.ub.tum.de/doc/602551/602551.pdf [30.11.2023 - 09:00 Uhr]
      - https://catchthezenith.com/?s=Spaced+Repetition%3A+Spare+Zeit+und+vergesse+nicht+mehr [30.11.2023 - 09:22 Uhr]
      - https://lexikon.stangl.eu/9382/spacing-effect-intervall-effekt#comment-10857 [30.11.2023 - 09:31 Uhr]
      - https://i0.wp.com/catchthezenith.com/wp-content/uploads/2020/07/IMG_0347.jpg?resize=1536%2C1288&ssl=1 [30.11.2023 - 09:27 Uhr]
      - https://i0.wp.com/catchthezenith.com/wp-content/uploads/2020/07/IMG_0347.jpg?resize=1536%2C1288&ssl=1 [4.12.2023 - 19:20 Uhr]
      - https://apps.ankiweb.net/ [4.12.2023 - 20:00 Uhr]
      - https://de.wikipedia.org/wiki/Anki [4.12.2023 - 20:30 Uhr]
      - https://de.wikipedia.org/wiki/Spaced_repetition [4.12.2023 - 20:35 Uhr]
      - https://en.wikipedia.org/wiki/Spaced_repetition [4.12.2023 - 20:50 Uhr]
      - https://edresearch.edu.au/practice-hub/spacing-and-retrieval [4.12.2023 - 20:40 Uhr]
      - https://www.brainscape.com/ [4.12.2023 - 20:45 Uhr]
      - https://ceur-ws.org/Vol-1332/paper_05.pdf [4.12.2023 - 21:00 Uhr]
      `}
      fontSize={20}
      fill={"white"}
      opacity={0}
      textAlign={"left"}
    />
  );

  yield* text().text("Quellen", 0.5);

  yield* quellenText().opacity(1, 1);

  yield* beginSlide("Finales Ende");
});
