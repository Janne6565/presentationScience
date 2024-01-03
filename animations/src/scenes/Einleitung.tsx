import {
  CubicBezier,
  Knot,
  Line,
  Ray,
  Rect,
  Spline,
  Txt,
  makeScene2D,
} from "@motion-canvas/2d";
import {
  all,
  beginSlide,
  createRef,
  delay,
  waitFor,
} from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  view.fill("#1a1a1a");


  yield* beginSlide("Intro");

  const textHeading = createRef<Txt>();
  view.add(
    <Txt
      ref={textHeading}
      text="Lernen"
      fill={"white"}
      fontSize={130}
      opacity={0}
    />
  );

  yield* textHeading().opacity(1, 0.5);

  yield* beginSlide("Intro2");

  yield* textHeading().opacity(0, 0.5);

  const spline = createRef<Spline>();
  const border = createRef<Rect>();
  const textLeft = createRef<Txt>();
  const textBottom = createRef<Txt>();

  view.add(
    <Rect
      ref={border}
      layout
      width={1920 * 0.8}
      height={1080 * 0.8}
      fill={"#121212"}
      justifyContent={"center"}
      alignItems={"center"}
      stroke={"rgba(0, 0, 0, .5)"}
      lineWidth={7}
      scale={0}
    />
  );

  view.add(
    <Txt
      ref={textLeft}
      text="Wissen"
      fill={"rgba(255, 255, 255, 0.4)"}
      fontSize={40}
      opacity={0}
      x={-810}
      rotation={-90}
    />
  );

  view.add(
    <Txt
      ref={textBottom}
      text="Zeit"
      fill={"rgba(255, 255, 255, 0.4)"}
      fontSize={40}
      opacity={0}
      x={0}
      y={470}
    />
  );

  view.add(
    <Spline
      ref={spline}
      lineWidth={10}
      stroke={"lightseagreen"}
      end={0}
      start={0}
      scale={0.8}
    >
      <Knot position={[-800, 0]} />
      <Knot position={[-400, -200]} />
      <Knot position={[0, -200]} />
      <Knot position={[200, 200]} />
      <Knot position={[800, 300]} />
    </Spline>
  );

  yield * border().scale(1, 0.5);
  yield * all(textLeft().opacity(1, 0.5), textBottom().opacity(1, 0.5));

  yield * beginSlide("Spline");
  yield * spline().end(0.3, 3);

  yield * beginSlide("SplinePop");

  yield * spline().end(1, 3);

  yield * beginSlide("Next page 1");

  yield * spline().start(1, 1);

  yield *
    all(
      border().scale(0, 0.5),
      textLeft().opacity(0, 0.5),
      textBottom().opacity(0, 0.5)
    );
  border().remove();
  textLeft().remove();
  textBottom().remove();

  // Create your animations here
  const heading = createRef<Txt>();

  view.add(
    <Txt
      ref={heading}
      text="Spacing & Retrieval"
      fill={"white"}
      fontSize={130}
      y={view.height() / 1.7}
    />
  );

  yield * beginSlide("Introduction");

  yield * heading().position.y(-50, 1);

  yield * beginSlide("Details");

  yield * all(heading().position.y(-200, 1), heading().fontSize(100, 1));

  const option1 = createRef<Txt>();
  const option2 = createRef<Txt>();
  const option3 = createRef<Txt>();
  const timeline = createRef<Ray>();
  const colorFont = "#BBD1EA";
  const colorArrow = "#507DBC";

  view.add(
    <>
      <Rect
        layout
        width={1920}
        fill={null}
        justifyContent={"space-evenly"}
        y={400}
      >
        <Txt
          ref={option1}
          text="Allgemeines"
          fill={colorFont}
          fontSize={80}
          opacity={0}
        />
        <Txt
          ref={option2}
          text="Anwendung"
          fill={colorFont}
          fontSize={80}
          opacity={0}
        />
        <Txt
          ref={option3}
          text="Nutzen"
          fill={colorFont}
          fontSize={80}
          opacity={0}
        />
      </Rect>
      <Ray
        lineWidth={8}
        endArrow
        stroke={colorArrow}
        ref={timeline}
        fromX={-900}
        toX={900}
        y={500}
      />
    </>
  );

  timeline().end(0);
  yield * beginSlide("Warum Einleitung");

  yield * timeline().start(1 / 3, 1);
  yield * option1().opacity(1, 0.4);

  yield * beginSlide("Anwendung");

  yield * timeline().start(2 / 3, 1);
  yield * option2().opacity(1, 0.4);

  yield * beginSlide("Nutzen");

  yield * timeline().start(1, 1);
  yield * option3().opacity(1, 0.4);

  yield * beginSlide("");

  yield *
    all(
      timeline().end(1, 1),
      option1().opacity(0, 1),
      option2().opacity(0, 1),
      option3().opacity(0, 1),
      heading().position.y(0, 1),
      heading().fontSize(130, 1)
    );

  timeline().remove();
  option1().remove();
  option2().remove();
  option3().remove();

  yield * heading().text("Spaced Retrieval", 2);

  yield * beginSlide("Warum");
  yield * heading().y(-800, 0.4);
});
