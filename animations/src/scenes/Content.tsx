import {
  Line,
  Ray,
  Rect,
  Txt,
  View2D,
  makeScene2D,
  Img,
  Path,
  Circle,
  Spline,
} from "@motion-canvas/2d";
import {
  beginSlide,
  createRef,
  waitFor,
  all,
  Reference,
  delay,
} from "@motion-canvas/core";
import AllgemeinesSpacing from "./spacing/Allgemeines";
import Anwendung from "./spacing/Anwendung";
import SuperMemo from "./spacing/superMemo";

import AllgemeinesRetrieval from "./retrieval/Allgemeines";
import AnwendungRetrieval from "./retrieval/Anwendung";

import AllgemeinesSpacedRetrieval from "./spacedRetrieval/Allgemeines";
import ResultateSpacedRetrieval from "./spacedRetrieval/Resultate";
import SchlussfolgerungSpacedRetrieval from "./spacedRetrieval/Schlussfolgerung";
import Neuronales from "./spacing/Neuronales";

import cite from "./spacing/assets/citeAllgemein.png";

import mouseImg from "./spacing/assets/mouse.png";
import labyrinth from "./spacing/assets/labyrinth.png";

import screenshot1 from "./spacing/assets/screenshots/image1.png";
import screenshot2 from "./spacing/assets/screenshots/image2.png";
import screenshot3 from "./spacing/assets/screenshots/image3.png";

import citeImg from "./retrieval/assets/retrievalCite.png";
import citeImg2 from "./retrieval/assets/retrievalFolgen.png";

import aufgaben from "./retrieval/assets/optionen/aufgaben.png";
import erklaeren from "./retrieval/assets/optionen/erklaeren.png";
import recapping from "./retrieval/assets/optionen/recapping.png";
import klassenraum from "./retrieval/assets/klassenraum.jpeg";

import imageStudy from "./spacedRetrieval/assets/imageStudy.png";

import motivationImg from "./spacedRetrieval/assets/motivation.png";
import lernverhalten from "./spacedRetrieval/assets/lernverhalten.png";

export default makeScene2D(function* (view) {
  view.fill("#1a1a1a");

  const textSectionTitle = createRef<Txt>();
  const textSubSectionTitle = createRef<Txt>();

  view.add(
    <Rect
      layout
      width={1720}
      height={200}
      fill={null}
      justifyContent={"space-evenly"}
      direction={"column"}
      alignItems={"center"}
      y={-400}
    >
      <Txt ref={textSectionTitle} text="" fill={"white"} fontSize={80} />

      <Txt ref={textSubSectionTitle} text="" fill={"white"} fontSize={50} />
    </Rect>
  );
  yield* beginSlide(
    "Spacing_Allgemein / Ebbinghaus-Vergessenskurve SlideStart"
  );
  yield* textSectionTitle().text("Spacing", 1);
  yield* textSubSectionTitle().text(
    "Allgemein / Ebbinghaus-Vergessenskurve",
    1
  );
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
  yield* all(paths.D3().end(1, 0.5), paths.D3().start(0, 0.5));
  yield* texts.D3().opacity(1, 0.5);

  yield* beginSlide("V3");
  yield* paths.V3().end(1, 3);
  yield* all(paths.W1().end(1, 0.5), paths.W1().start(0, 0.5));
  yield* texts.W1().opacity(1, 0.5);

  yield* beginSlide("V4");
  yield* paths.V4().end(1, 3);
  yield* all(paths.M1().end(1, 0.5), paths.M1().start(0, 0.5));
  yield* texts.M1().opacity(1, 0.5);

  yield* beginSlide("Next page 2");
  yield* all(
    paths.V1().start(1, 1),
    paths.V2().start(1, 1),
    paths.V3().start(1, 1),
    paths.V4().start(1, 1),
    paths.D3().end(0, 0.5),
    paths.W1().end(0, 0.5),
    paths.M1().end(0, 0.5),
    paths.D3().start(0, 0.5),
    paths.W1().start(0, 0.5),
    paths.M1().start(0, 0.5),
    texts.D3().opacity(0, 0.5),
    texts.W1().opacity(0, 0.5),
    texts.M1().opacity(0, 0.5)
  );

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

  yield* beginSlide("Spacing_Neuronaler Hintergrund SlideStart");
  yield* textSubSectionTitle().text("Neuronaler Hintergrund", 1);
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
  mouseRef().remove();
  labyrinthRef().remove();

  yield* beginSlide("Spacing_Anwendung SlideStart");
  yield* textSectionTitle().text("Anwendung", 1);

  const COLOR_DOT_CORRECT = "rgba(0, 150, 0, 1)";
  const COLOR_DOT_WRONG = "rgba(200, 0, 0, 1)";
  const COLOR_CONTAINER_ACTIVE = "rgb(200, 200, 200)";

  const cards = [createRef<Rect>(), createRef<Rect>(), createRef<Rect>()];
  const cardColors = ["#FFD166", "#06D6A0", "#118AB2"];
  const currentDay = createRef<Txt>();

  const votes = [createRef<Circle>(), createRef<Circle>(), createRef<Circle>()];

  const containers = [createRef<Rect>(), createRef<Rect>(), createRef<Rect>()];
  view.add(
    <Txt
      ref={currentDay}
      fontSize={60}
      fill={"rgba(255, 255, 255, 0.7)"}
      y={-225}
      opacity={1}
    />
  );

  view.add(
    cards.map((card, index) => (
      <Rect
        ref={card}
        width={250}
        height={300}
        fill={cardColors[index]}
        key={String(index)}
        radius={10}
        y={800}
        shadowBlur={20}
        shadowColor={"black"}
        x={-500 + index * 50 - 50}
        layout
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Circle
          width={100}
          height={100}
          fill={"white"}
          opacity={0}
          ref={votes[index]}
        />
      </Rect>
    ))
  );

  view.add(
    containers.map((container, index) => (
      <Rect
        ref={container}
        width={400}
        height={500}
        fill={"gray"}
        shadowBlur={20}
        shadowColor={"black"}
        radius={10}
        y={800}
        x={index * 500 - 500}
        justifyContent={"center"}
        alignItems={"center"}
        layout
      >
        <Txt
          text={String(index + 1)}
          shadowBlur={5}
          shadowColor={"black"}
          fill={"white"}
          fontSize={100}
        />
      </Rect>
    ))
  );

  yield* all(...containers.map((container, index) => container().y(450, 1)));

  yield* beginSlide("Show Cards");

  yield* all(...cards.map((card, index) => card().y(200, 1)));

  yield* beginSlide("Start Tag 1");

  yield* currentDay().text("Tag 1", 1);

  yield* all(
    containers[0]().fill(COLOR_CONTAINER_ACTIVE, 1),
    ...cards.map((card, index) => card().y(0, 1)),
    delay(
      0.5,
      all(...cards.map((card, index) => card().x(-500 + index * 300 - 300, 1)))
    )
  );

  yield* beginSlide("Take Guesses1");
  yield* all(
    votes[0]().fill(COLOR_DOT_CORRECT, 1),
    votes[0]().opacity(0.7, 1),
    votes[1]().fill(COLOR_DOT_WRONG, 1),
    votes[1]().opacity(1, 1),
    votes[2]().fill(COLOR_DOT_WRONG, 1),
    votes[2]().opacity(1, 1)
  );

  yield* beginSlide("Show Correct");
  yield* all(
    containers[0]().fill("gray", 1),
    cards[1]().x(-525, 1),
    cards[2]().x(-475, 1),
    cards[0]().x(0, 1),
    delay(
      0.5,
      all(
        ...cards.map((card) => card().y(200, 1)),
        ...votes.map((vote) => vote().opacity(0, 0.5))
      )
    )
  );

  yield* beginSlide("Start Tag 2");

  yield* currentDay().text("Tag 2", 0.3);

  yield* all(
    containers[0]().fill(COLOR_CONTAINER_ACTIVE, 1),
    containers[1]().fill(COLOR_CONTAINER_ACTIVE, 1),
    ...cards.map((card, index) => card().y(0, 1)),
    cards[1]().x(-600, 1),
    cards[2]().x(-400, 1)
  );

  yield* beginSlide("Take Guesses2");

  yield* all(
    votes[0]().fill(COLOR_DOT_WRONG, 1),
    votes[0]().opacity(0.7, 1),
    votes[1]().fill(COLOR_DOT_CORRECT, 1),
    votes[1]().opacity(1, 1),
    votes[2]().fill(COLOR_DOT_WRONG, 1),
    votes[2]().opacity(1, 1)
  );

  yield* beginSlide("Resort1");
  yield* all(
    containers[0]().fill("gray", 1),
    containers[1]().fill("gray", 1),
    cards[1]().x(0, 1),
    cards[2]().x(-475, 1),
    cards[0]().x(-525, 1),
    delay(
      0.5,
      all(
        ...cards.map((card) => card().y(200, 1)),
        ...votes.map((vote) => vote().opacity(0, 0.5))
      )
    )
  );

  yield* beginSlide("Start Tag 3");
  yield* currentDay().text("Tag 3", 0.3);
  yield* all(
    containers[0]().fill(COLOR_CONTAINER_ACTIVE, 1),
    containers[2]().fill(COLOR_CONTAINER_ACTIVE, 1),
    cards[0]().y(0, 1),
    cards[2]().y(0, 1),
    cards[2]().x(-400, 1),
    cards[0]().x(-600, 1)
  );

  yield* beginSlide("Take Guesses3");
  yield* all(
    votes[0]().fill(COLOR_DOT_WRONG, 1),
    votes[0]().opacity(0.7, 1),
    votes[2]().fill(COLOR_DOT_CORRECT, 1),
    votes[2]().opacity(1, 1)
  );

  yield* beginSlide("Resort2");
  yield* all(
    containers[0]().fill("gray", 1),
    containers[2]().fill("gray", 1),
    cards[1]().x(-25, 1),
    cards[2]().x(25, 1),
    cards[0]().x(-500, 1),
    delay(
      0.5,
      all(
        ...cards.map((card) => card().y(200, 1)),
        ...votes.map((vote) => vote().opacity(0, 0.5))
      )
    )
  );

  yield* beginSlide("Start Tag 4");
  yield* currentDay().text("Tag 4", 0.3);
  yield* all(
    containers[0]().fill(COLOR_CONTAINER_ACTIVE, 1),
    containers[1]().fill(COLOR_CONTAINER_ACTIVE, 1),
    ...cards.map((card, index) => card().y(0, 1)),
    cards[1]().x(-100, 1),
    cards[2]().x(100, 1),
    cards[0]().x(-500, 1)
  );

  yield* beginSlide("Take Guesses4");
  yield* all(
    votes[0]().fill(COLOR_DOT_CORRECT, 1),
    votes[0]().opacity(0.7, 1),
    votes[1]().fill(COLOR_DOT_CORRECT, 1),
    votes[1]().opacity(1, 1),
    votes[2]().fill(COLOR_DOT_CORRECT, 1),
    votes[2]().opacity(1, 1)
  );

  yield* beginSlide("Resort3");

  yield* all(
    containers[0]().fill("gray", 1),
    containers[1]().fill("gray", 1),
    cards[0]().x(0, 1),
    cards[1]().x(475, 1),
    cards[2]().x(525, 1),
    delay(
      0.5,
      all(
        ...cards.map((card) => card().y(200, 1)),
        ...votes.map((vote) => vote().opacity(0, 0.5))
      )
    )
  );

  yield* beginSlide("Cleanup5");

  yield* all(
    ...cards.map((card, index) => card().y(800, 1)),
    ...containers.map((container) => container().y(800, 1)),
    currentDay().text("", 1)
  );
  cards.map((card) => card().remove());
  containers.map((container) => container().remove());
  currentDay().remove();

  yield* beginSlide("Spacing_Super Memo SlideStart");
  yield* textSubSectionTitle().text("Super Memo", 1);
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

  yield* beginSlide("Retrieval_Allgemein SlideStart");
  yield* textSectionTitle().text("Retrieval", 1);
  yield* textSubSectionTitle().text("Allgemein", 1);

  const citeRef = createRef<Img>();
  view.add(<Img ref={citeRef} src={citeImg} width={400} opacity={0} />);
  yield* citeRef().opacity(1, 1);

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

  yield* citeRef().x(-400, 1);
  yield* all(arrow().end(1, 1), arrow().arrowSize(50, 1));

  const image2 = createRef<Img>();
  view.add(<Img src={citeImg2} width={500} opacity={0} x={420} ref={image2} />);

  yield* image2().opacity(1, 1);

  yield* beginSlide("Cleanup");

  yield* all(
    citeRef().opacity(0, 1),
    arrow().start(1, 1),
    arrow().opacity(0, 1),
    image2().opacity(0, 1)
  );

  citeRef().remove();
  arrow().remove();
  image2().remove();

  yield* beginSlide("Retrieval_Anwendung SlideStart");
  yield* textSubSectionTitle().text("Anwendung", 1);

  const image1Anwendung = createRef<Img>();
  const image2Anwendung = createRef<Img>();
  const image3Anwendung = createRef<Img>();

  view.add(
    <>
      <Img src={aufgaben} width={500} opacity={0} ref={image1Anwendung} />
      <Img
        src={erklaeren}
        width={500}
        opacity={0}
        ref={image2Anwendung}
        scale={0.9}
      />
      <Img src={recapping} width={500} opacity={0} ref={image3Anwendung} />
    </>
  );

  yield* image3Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben3");
  yield* all(
    image3Anwendung().x(600, 1),
    image3Anwendung().y(350, 1),
    image3Anwendung().scale(0.8, 1)
  );

  yield* image1Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben1");
  yield* all(
    image1Anwendung().x(-600, 1),
    image1Anwendung().y(350, 1),
    image1Anwendung().scale(0.7, 1)
  );

  yield* image2Anwendung().opacity(1, 1);

  yield* beginSlide("Aufgaben2");
  yield* all(
    image2Anwendung().x(0, 1),
    image2Anwendung().y(350, 1),
    image2Anwendung().scale(0.65, 1)
  );

  yield* beginSlide("Cleanup1");
  yield* all(
    image1Anwendung().opacity(0, 1),
    image2Anwendung().opacity(0, 1),
    image3Anwendung().opacity(0, 1)
  );
  image1Anwendung().remove();
  image2Anwendung().remove();
  image3Anwendung().remove();

  yield* beginSlide("Retrieval_Studie Jonas");
  yield* textSubSectionTitle().text("Studie", 1);

  const textBotLeft = createRef<Txt>();
  view.add(
    <Txt
      ref={textBotLeft}
      text={
        "[Lernzentrierte Lehre: Retrieval-Based Learning in der Softwaretechnik] - Herzberg, Dominikus, and Kerstin Raudonat SEUH. 2015"
      }
      fontSize={25}
      fill={"rgba(255, 255, 255, 0.5)"}
      x={-220}
      y={500}
      opacity={0}
    />
  );

  yield* textBotLeft().opacity(1, 0.6);

  const imageKlassenraum = createRef<Img>();

  view.add(
    <Img
      ref={imageKlassenraum}
      src={klassenraum}
      width={800}
      stroke={"black"}
      lineWidth={15}
      opacity={0}
    />
  );

  yield* beginSlide("Studie1");

  yield* imageKlassenraum().opacity(1, 1);

  yield* beginSlide("Cleanup2");
  yield* all(textBotLeft().opacity(0, 1), imageKlassenraum().opacity(0, 1));
  textBotLeft().remove();
  imageKlassenraum().remove();

  yield* beginSlide("Spaced Retrieval_Studie SlideStart");
  yield* textSectionTitle().text("Spaced Retrieval", 1);
  yield* textSubSectionTitle().text("Studie", 1);

  const textBottomLeft = createRef<Txt>();
  view.add(
    <Txt
      ref={textBottomLeft}
      text={
        '[Kognitives Training bei Alzheimer-Patienten unter Anwendung der "Spaced Retrieval Technik"] - Christine Gabriel 2004'
      }
      fontSize={25}
      fill={"rgba(255, 255, 255, 0.5)"}
      x={-275}
      y={500}
      opacity={0}
    />
  );

  yield* textBottomLeft().opacity(1, 1);

  yield* beginSlide("Studie4");

  const imgStudyRef = createRef<Img>();
  view.add(
    <Img
      src={imageStudy}
      width={800}
      y={75}
      stroke={"black"}
      lineWidth={15}
      ref={imgStudyRef}
      opacity={0}
    />
  );

  yield* imgStudyRef().opacity(1, 1);

  yield* beginSlide("Cleanup32");

  yield* all(textBottomLeft().opacity(0, 1), imgStudyRef().opacity(0, 1));

  textBottomLeft().remove();
  imgStudyRef().remove();

  yield* beginSlide("Spaced Retrieval_Resultate SlideStart");
  yield* textSubSectionTitle().text("Resultate", 1);

  const imageRef1 = createRef<Img>();
  const imageRef2 = createRef<Img>();

  view.add(
    <>
      <Img
        src={motivationImg}
        width={500}
        opacity={0}
        y={40}
        ref={imageRef1}
        scale={0.8}
      />
      <Img src={lernverhalten} width={500} opacity={0} y={40} ref={imageRef2} />
    </>
  );

  yield* imageRef1().opacity(1, 1);

  yield* beginSlide("Motivation1");

  yield* all(imageRef1().x(-500, 1));

  yield* imageRef2().opacity(1, 1);

  yield* beginSlide("Motivation2");

  yield* all(imageRef2().x(500, 1));

  yield* beginSlide("Cleanup3");

  yield* all(imageRef1().opacity(0, 1), imageRef2().opacity(0, 1));

  imageRef1().remove();
  imageRef2().remove();

  yield* beginSlide("Spaced Retrieval_Schlussfolgerung SlideStart");
  yield* textSubSectionTitle().text("​", 1);

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
  yield* textSectionTitle().text("", 1);
});
