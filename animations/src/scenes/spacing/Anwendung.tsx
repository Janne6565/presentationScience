import { Circle, Rect, Txt, View2D } from "@motion-canvas/2d";
import {
  Center,
  all,
  beginSlide,
  createRef,
  createSignal,
  delay,
} from "@motion-canvas/core";
const COLOR_DOT_CORRECT = "rgba(0, 150, 0, 1)";
const COLOR_DOT_WRONG = "rgba(200, 0, 0, 1)";
const COLOR_CONTAINER_ACTIVE = "rgb(200, 200, 200)";

export default function* (view: View2D) {
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
  yield *
    all(
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
}
