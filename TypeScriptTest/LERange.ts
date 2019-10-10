import { LifeEvent } from "./LifeEvent";

class LERange {
    constructor(readonly lifeEvent: LifeEvent,
        readonly min: number, readonly max: number,
        readonly maxOccurences?: number) { }
}
export { LERange }