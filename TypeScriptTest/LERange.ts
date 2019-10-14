import { LifeEvent } from "./LifeEvent.js";

class LERange {
    constructor(readonly lifeEvent: LifeEvent,
        readonly min: number, readonly max: number,
        readonly maxOccurences?: number) { }
}
export { LERange }