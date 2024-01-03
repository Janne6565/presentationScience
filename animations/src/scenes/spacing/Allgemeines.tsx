import { Img, Path, Rect, Txt, View2D } from "@motion-canvas/2d";
import {
  Reference,
  all,
  beginSlide,
  createRef,
} from "@motion-canvas/core";
import cite from "./assets/citeAllgemein.png";

export default function* (view: View2D) {
  yield* view.scale(0.5, 0.5);
  const imageCite = createRef<Img>();
  view.add(<Img ref={imageCite} src={cite} y={150} opacity={0} />);
  yield* imageCite().opacity(1, 1);
  yield* beginSlide("Show Bild");
  yield* imageCite().opacity(0, 1);
  const border = createRef<Rect>();

  const paths: { [key: string]: Reference<Path> } = {
    V1: createRef<Path>(),
    V2: createRef<Path>(),
    V3: createRef<Path>(),
    V4: createRef<Path>(),
    D3: createRef<Path>(),
    W1: createRef<Path>(),
    M1: createRef<Path>(),
  };

  const texts: { [key: string]: Reference<Txt> } = {
    D3: createRef<Txt>(),
    W1: createRef<Txt>(),
    M1: createRef<Txt>(),
  };

  const fillColor = "BBBBBB";

  view.add(
    <Rect
      ref={border}
      width={1920 * 0.6}
      height={1080 * 0.6}
      fill={"rgba(0, 0, 0, 0.3)"}
      stroke={"white"}
      lineWidth={6}
      y={80}
      opacity={0}
    >
      <Path
        ref={paths.V1}
        lineWidth={4}
        stroke={"rgba(255, 0, 0, 0.5)"}
        data="M74 44C74 44 80.6682 321.041 304.529 460.485C496.577 580.112 1087 587 1125 587"
        position={[-600, -300]}
        scale={1}
        start={0}
        end={0}
      />
      <Path
        ref={paths.V2}
        lineWidth={4}
        stroke={"rgba(255, 165, 0, 0.5)"}
        data="M221 44C221 44 226.701 195.531 418.077 271.801C582.256 337.233 1087 341 1125 341"
        position={[-600, -300]}
        scale={1}
        start={0}
        end={0}
      />
      <Path
        ref={paths.V3}
        lineWidth={4}
        stroke={"rgba(255, 255, 0, 0.5)"}
        data="M495 44C495 44 515.051 95.8307 540.199 116.036C544.616 119.585 556.511 128.027 593.893 140.048C687.689 170.209 1087 191 1125 191"
        position={[-600, -300]}
        scale={1}
        start={0}
        end={0}
      />
      <Path
        ref={paths.V4}
        lineWidth={4}
        stroke={"rgba(0, 255, 165, 0.5)"}
        data="M827 44C827 44 835.806 64.4502 846.851 72.4223C848.791 73.8227 854.015 77.1535 870.433 81.8964C911.627 93.7968 1087 102 1125 102"
        position={[-600, -300]}
        scale={1}
        start={0}
        end={0}
      />
      <Path
        ref={paths.D3}
        lineWidth={4}
        stroke={fillColor}
        data="M80 29.5L210 29.5"
        position={[-600, -300]}
        scale={1}
        start={0.5}
        end={0.5}
        endArrow={true}
        startArrow={true}
        arrowSize={10}
      >
        <Txt
          text="3 Tage"
          ref={texts.D3}
          fill={fillColor}
          fontSize={25}
          position={[150, 55]}
          opacity={0}
        />
      </Path>
      <Path
        ref={paths.W1}
        lineWidth={4}
        stroke={fillColor}
        data="M230 30L485 30"
        position={[-600, -300]}
        scale={1}
        start={0.5}
        end={0.5}
        endArrow={true}
        startArrow={true}
        arrowSize={10}
      >
        <Txt
          ref={texts.W1}
          text="1 Woche"
          fill={fillColor}
          fontSize={25}
          position={[350, 55]}
          opacity={0}
        />
      </Path>
      <Path
        ref={paths.M1}
        lineWidth={4}
        stroke={fillColor}
        data="M507 30L815 30"
        position={[-600, -300]}
        scale={1}
        start={0.5}
        end={0.5}
        endArrow={true}
        startArrow={true}
        arrowSize={10}
      >
        <Txt
          ref={texts.M1}
          text="1 Monat"
          fill={fillColor}
          fontSize={25}
          position={[665, 55]}
          opacity={0}
        />
      </Path>
    </Rect>
  );

  const textLeft = createRef<Txt>();
  const textBottom = createRef<Txt>();

  view.add(
    <Txt
      ref={textLeft}
      text="Wissen"
      fill={"white"}
      fontSize={50}
      x={-620}
      y={75}
      opacity={0}
      rotation={-90}
    />
  );
  view.add(
    <Txt
      ref={textBottom}
      text="Zeit"
      fill={"white"}
      fontSize={50}
      y={450}
      opacity={0}
    />
  );

  yield* border().opacity(1, 1);
  yield* all(textLeft().opacity(1, 0.5), textBottom().opacity(1, 0.5));

  yield* beginSlide("V1");
  yield* paths.V1().end(1, 3);

  yield* beginSlide("V2");
  yield* paths.V2().end(1, 3);
  yield * all(paths.D3().end(1, 0.5), paths.D3().start(0, 0.5));
  yield * texts.D3().opacity(1, 0.5);

  yield* beginSlide("V3");
  yield* paths.V3().end(1, 3);
  yield* all(paths.W1().end(1, 0.5), paths.W1().start(0, 0.5));
  yield* texts.W1().opacity(1, 0.5);

  yield* beginSlide("V4");
  yield* paths.V4().end(1, 3);
  yield * all(paths.M1().end(1, 0.5), paths.M1().start(0, 0.5));
  yield * texts.M1().opacity(1, 0.5);

  yield* beginSlide("Next page 2");
  yield* all(paths.V1().start(1, 1), paths.V2().start(1, 1), paths.V3().start(1, 1), paths.V4().start(1, 1), paths.D3().end(0, 0.5), paths.W1().end(0, 0.5), paths.M1().end(0, 0.5), paths.D3().start(0, 0.5), paths.W1().start(0, 0.5), paths.M1().start(0, 0.5), texts.D3().opacity(0, 0.5), texts.W1().opacity(0, 0.5), texts.M1().opacity(0, 0.5));

  yield* all(
    border().scale(0, 0.5), 
    textLeft().opacity(0, 0.5),
    textBottom().opacity(0, 0.5)
  );

  border().remove();
  textLeft().remove();
  textBottom().remove();
  paths.V1().remove();
  paths.V2().remove();
  paths.V3().remove();
  paths.V4().remove();
  paths.D3().remove();
  paths.W1().remove();
  paths.M1().remove();
  texts.D3().remove();
  texts.W1().remove();
  texts.M1().remove();
  imageCite().remove();
}
