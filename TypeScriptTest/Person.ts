import { IPerson } from "./IPerson.js";

import { LERange } from "./LERange.js";

import { LifeEvent } from "./LifeEvent.js";

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

    private readonly firstName: String
    private readonly lastName: String
    private readonly lifeEventMap: Map<number, LifeEvent[]> = new Map()

    private age: number
    private life: number

    constructor(firstName: String, lastName: String) {
        this.firstName = firstName
        this.lastName = lastName
        this.age = 0
        this.haveLifeEvent(LifeEvent.Birth)
        this.setUpLifeEventMap()
    }

    live(): void {
        const that = this
        this.life = setInterval(function(){
            that.ageOneYear()
        }, 1000)
    }
    private ageOneYear(): void {
        this.age++
        const ageSpan = document.getElementById("age")
        ageSpan.classList.add("fade-out-short")
        const that = this
        setTimeout(function(){
            ageSpan.innerHTML = String(that.age)
            ageSpan.classList.remove("fade-out-short")
            ageSpan.classList.add("fade-up-short")
        }, 250)
        this.handleLifeEvents()
    }
    private handleLifeEvents(): void {
        if (this.lifeEventMap.get(this.age)){
            for (let lifeEvent of this.lifeEventMap.get(this.age)) {
                this.haveLifeEvent(lifeEvent)
            }
        }
    }
    private haveLifeEvent(event: LifeEvent): void {
        switch (event) {
            case LifeEvent.Birth: {
                Person.log(`${this.firstName} ${this.lastName} has been born!`)
                break
            }
            case LifeEvent.FirstDayOfSchool: {
                Person.log(`${this.firstName} ${this.lastName} had their first day of school!`)
                break
            }
            case LifeEvent.Graduation: {
                Person.log(`${this.firstName} ${this.lastName} graduated!`)
                break
            }
            case LifeEvent.Employment: {
                Person.log(`${this.firstName} ${this.lastName} landed a job!`)
                break
            }
            case LifeEvent.Marriage: {
                Person.log(`${this.firstName} ${this.lastName} got married!`)
                break
            }
            case LifeEvent.Procration: {
                Person.log(`${this.firstName} ${this.lastName} had a beautiful baby ${Person.pickBoyOrGirl()}!`)
                break
            }
            case LifeEvent.Death: {
                clearInterval(this.life)
                Person.log(`${this.firstName} ${this.lastName} has died.`)
                break
            }
        }
    }
    private static pickBoyOrGirl(): String {
        return (Math.random() >= .5 ? Person.BOY : Person.GIRL)
    }
    private setUpLifeEventMap(): void {
        for (let range of Person.ranges) {
            const occurences = range.maxOccurences ? Math.floor(Math.random() * range.maxOccurences) : 1
            for (let i = 0; i < occurences; i++) {
                const delta = Math.floor(Math.random() * (range.max - range.min))
                const year = range.min + delta
                if(this.lifeEventMap.get(year)){
                    this.lifeEventMap.get(year).push(range.lifeEvent)
                }
                else{
                    this.lifeEventMap.set(year, [range.lifeEvent])
                }
            }
        }
    }
    private static log(str: string){
        const log = document.getElementById("log")
        const div = document.createElement("div")
        div.style.display = "flex"
        div.innerHTML = str
        log.appendChild(div)
        div.classList.add("fade-up-short")
        setTimeout(function(){
            div.classList.remove("fade-up-short")
            div.classList.add("fade-out-short")
            setTimeout(function(){
                div.classList.remove("fade-out-short")
                div.style.opacity = "0"
                div.animate([
                    {height: `${div.clientHeight}px`},
                    {height: "0px"}
                ],{
                    duration: 250,
                    fill: "forwards",
                    easing: "ease-in-out"
                })
            },250)
        },5000)
    }
}
export { Person }