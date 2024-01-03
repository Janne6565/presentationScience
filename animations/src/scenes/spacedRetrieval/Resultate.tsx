import { Img, View2D } from "@motion-canvas/2d";
import { all, beginSlide, createRef } from "@motion-canvas/core";
import motivationImg from "./assets/motivation.png";
import lernverhalten from "./assets/lernverhalten.png";

export default function* (view: View2D) {
    const imageRef1 = createRef<Img>();
    const imageRef2 = createRef<Img>();

    view.add(
        <>
            <Img src={motivationImg} width={500} opacity={0} y={40} ref={imageRef1} scale={0.8} />
            <Img src={lernverhalten} width={500} opacity={0} y={40} ref={imageRef2}  />
        </>
    );

    yield* imageRef1().opacity(1, 1);

    yield* beginSlide("Motivation1");
    
    yield* all(
        imageRef1().x(-500, 1),
    );

    yield* imageRef2().opacity(1, 1);

    yield* beginSlide("Motivation2");

    yield* all(imageRef2().x(500, 1));

    yield* beginSlide("Cleanup3");

    yield* all(
        imageRef1().opacity(0, 1),
        imageRef2().opacity(0, 1)
    );

    imageRef1().remove();
    imageRef2().remove();
}