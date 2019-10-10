class Person implements IPerson {
    private static readonly BOY = "boy"
    private static readonly GIRL = "girl"
    private static readonly ranges: LERange[] = [
        new LERange(LifeEvent.FirstDayOfSchool, 3, 6),
        new LERange(LifeEvent.Graduation, 16, 20),
        new LERange(LifeEvent.Employment, 16, 25),
        new LERange(LifeEvent.Marriage, 16, 40, 4),
        new LERange(LifeEvent.Procration, 15, 45, 6),
        new LERange(LifeEvent.Death, 0, 100)
    ];
    private firstName: String
    private lastName: String
    private age: number
    private lifeEventMap: Map<number, LifeEvent[]>
    constructor(firstName: String, lastName: String) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = 0
        this.haveLifeEvent(LifeEvent.Birth)
        this.setUpLifeEventMap()
    }
    ageOneYear(): void {
        this.age++
        this.handleLifeEvents()
    }
    private handleLifeEvents(): void {
        for (let lifeEvent of this.lifeEventMap.get(this.age)) {
            this.haveLifeEvent(lifeEvent)
        }
    }
    private haveLifeEvent(event: LifeEvent): void {
        switch (event) {
            case LifeEvent.Birth: {
                console.log(`${this.firstName} ${this.lastName} has been born!`)
                break
            }
            case LifeEvent.FirstDayOfSchool: {
                console.log(`${this.firstName} ${this.lastName} had their first day of school!`)
                break
            }
            case LifeEvent.Graduation: {
                console.log(`${this.firstName} ${this.lastName} graduated!`)
                break
            }
            case LifeEvent.Employment: {
                console.log(`${this.firstName} ${this.lastName} landed a job!`)
                break
            }
            case LifeEvent.Marriage: {
                console.log(`${this.firstName} ${this.lastName} got married!`)
                break
            }
            case LifeEvent.Procration: {
                console.log(`${this.firstName} ${this.lastName} had a beautiful baby ${Person.pickBoyOrGirl()}!`)
                break
            }
            case LifeEvent.Death: {
                console.log(`${this.firstName} ${this.lastName} has died.`)
                break
            }
        }
    }
    private static pickBoyOrGirl(): String {
        return (Math.random() >= .5 ? Person.BOY : Person.GIRL)
    }
    setUpLifeEventMap(): void {
        for (let range of Person.ranges) {
            const occurences = range.maxOccurences ? Math.floor(Math.random() * range.maxOccurences) : 1
            for(let i = 0; i < occurences; i++){
                const delta = Math.floor(Math.random() * (range.max - range.min))
                const year = range.min + delta
                this.lifeEventMap.get(year).push(range.lifeEvent)
            }
        }
    }
}