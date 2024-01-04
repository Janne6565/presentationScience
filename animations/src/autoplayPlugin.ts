import { makePlugin } from "@motion-canvas/core";


export default makePlugin({
    name: "Auto play plugin",
    presenter(presenter) {
        presenter.onInfoChanged.subscribe((event) => {
            console.log(event);
        })
        console.log("HELLO")
    },
    player(player) {
        player.onRender.subscribe(async (event) => {
            console.log("PLAYER ONLINE")
        })
        console.log("HEYHO")
    }
})