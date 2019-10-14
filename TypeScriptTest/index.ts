import { SimulationEngine } from "./SimulationEngine.js"

window.addEventListener("load", function () {
    SimulationEngine.getInstance().run()
})