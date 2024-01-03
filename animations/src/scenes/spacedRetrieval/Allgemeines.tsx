import { Img, Txt, View2D } from "@motion-canvas/2d";
import imageStudy from "./assets/imageStudy.png";
import { all, beginSlide, createRef } from "@motion-canvas/core";


export default function* (view: View2D) {
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

    yield* beginSlide("Studie1");

    const imgStudyRef = createRef<Img>();
    view.add(<Img src={imageStudy} width={800} y={75} stroke={"black"} lineWidth={15} ref={imgStudyRef} opacity={0}/>);

    yield* imgStudyRef().opacity(1, 1);

    yield* beginSlide("Cleanup2");

    yield* all(textBottomLeft().opacity(0, 1), imgStudyRef().opacity(0, 1));

}