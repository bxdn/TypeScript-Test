import { Person } from "./Person.js"

class SimulationEngine {
    private static instance: SimulationEngine
    private firstName: String
    private lastName: String
    private constructor() {
        document.addEventListener("keyup", (e) => {
            if (e.code === "Enter") {
                if (!this.firstName && !this.lastName) {
                    const firstNameEl = (<HTMLInputElement>document.getElementById("fni"))
                    const lastNameEl = (<HTMLInputElement>document.getElementById("lni"))
                    SimulationEngine.instance.firstName = firstNameEl.value ? firstNameEl.value : firstNameEl.placeholder
                    SimulationEngine.instance.lastName = lastNameEl.value ? lastNameEl.value : lastNameEl.placeholder
                    this.incrementalFadeOut(document.getElementById("parent"))
                }
            }
        })
    }
    static getInstance() {
        if (!SimulationEngine.instance) {
            SimulationEngine.instance = new SimulationEngine()
        }
        return SimulationEngine.instance
    }
    run() {
        this.incrementalFadeIn()
    }
    private incrementalFadeIn() {
        setTimeout(function () {
            document.getElementById("fn").classList.add("fade-up")
            setTimeout(function () {
                document.getElementById("fni").classList.add("fade-up")
                setTimeout(function () {
                    document.getElementById("ln").classList.add("fade-up")
                    setTimeout(function () {
                        document.getElementById("lni").classList.add("fade-up")
                    }, 200)
                }, 200)
            }, 200)
        }, 200)
    }
    private incrementalFadeOut(parent: HTMLElement, index: number = 0) {
        let children = parent.children
        if (index >= children.length) {
            setTimeout(function () {
                parent.style.display = "none"
                const sim = document.getElementById("sim")
                sim.style.display = "flex"
                sim.classList.add("fade-up-short")
                new Person(SimulationEngine.instance.firstName, SimulationEngine.instance.lastName).live()
            }, 800)
            return
        }
        if (children[index].tagName == "BR") {
            this.incrementalFadeOut(parent, index + 1)
            return
        }
        children[index].classList.add("fade-out")
        const that = this
        setTimeout(function () {
            that.incrementalFadeOut(parent, index + 1)
        }, 200)
    }
}
export { SimulationEngine }
