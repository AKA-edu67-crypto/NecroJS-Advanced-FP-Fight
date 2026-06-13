const defaultCharacter = {
    life: 1,
    maxlife: 1,
    attack: 0,
    defense: 0
}

const createBarbarian = (name) => {
    return {
        ...defaultCharacter,
        type: "barbarian",
        name,
        life: 100,
        maxlife: 100,
        attack: 15,
        defense: 8,
        //New: CritcChance
        critChance: 0.05
    }
}

const createAssassin = (name) => {
    return {
        ...defaultCharacter,
        type: "assassin",
        name,
        life: 70,
        maxlife: 70,
        attack: 10,
        defense: 5,
        //New: CritcChance
        critChance: 0.35
    }
}

//Update: New Necromancer class
const createNecromancer = (name) => {
    return {
        ...defaultCharacter,
        type: "necromancer",
        name,
        life: 47,
        maxlife: 47,
        attack: 6,
        defense: 6,
        //New: CritcChance
        critChance: 0.15,
        //Summon
        summon: {
        name: "Capirotinho",
        life: 20,
        maxlife: 20,
        attack: 6,
        defense: 3,
        }
    }
}

const createLittleMonster = () => {
    return {
        ...defaultCharacter,
        name: "Little Monster",
        life: 40,
        maxlife: 40,
        attack: 7,
        defense: 3,
    }
}

const createBigMonster = () => {
    return {
        ...defaultCharacter,
        name: "Big Monster",
        life: 120,
        maxlife: 120,
        attack: 16,
        defense: 12
    }
}

const stage = {
    fighter1: null,
    fighter2: null,
    fighter1El: null,
    fighter2El: null,
    summonEl: null,
    currentTurn: null,//NEW: Creation Of A Shift System

    start(fighter1, fighter2, fighter1El, fighter2El, summonEl) {
        this.fighter1 = fighter1,
        this.fighter2 = fighter2,
        this.fighter1El = fighter1El,
        this.fighter2El = fighter2El,
        this.summonEl = summonEl,
        this.currentTurn = this.fighter1

        this.fighter1El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter1, this.fighter2))
        this.fighter2El.querySelector(".attackButton").addEventListener("click", () => this.doAttack(this.fighter2, this.fighter1))

        //Healling Button
        this.fighter1El.querySelector(".ButtonHeal").addEventListener("click", () => this.doHeal(this.fighter1))

        this.update()
    },
    update() {
        this.fighter1El.querySelector(".name").innerHTML = `${this.fighter1.name} - ${this.fighter1.life.toFixed(1)} HP`
        let f1Pct = (this.fighter1.life / this.fighter1.maxlife) * 100
        this.fighter1El.querySelector(`.bar`).style.width = `${f1Pct}%`

        this.fighter2El.querySelector(".name").innerHTML = `${this.fighter2.name} - ${this.fighter2.life.toFixed(1)} HP`
        let f2Pct = (this.fighter2.life / this.fighter2.maxlife) * 100
        this.fighter2El.querySelector(`.bar`).style.width = `${f2Pct}%`

        const summonEl = this.fighter1El.querySelector("#summon")
        if(this.fighter1.type === "necromancer" && this.fighter1.summon) {
            const summon = this.fighter1.summon
            summonEl.style.display = "block"

            if(summon.life > 0) {

            summonEl.querySelector(".name").innerHTML = `${summon.name} - ${summon.life.toFixed(1)} HP`
            let summonPct = (summon.life / summon.maxlife) * 100
            summonEl.querySelector(".bar").style.width = `${summonPct}%`
            summonEl.querySelector(".bararea").style.display = "block"
            } else {
                summonEl.querySelector(".name").innerHTML = `${summon.name} Is Out Of Battle`
                summonEl.querySelector(".bar").style.width = "0%"
                summonEl.querySelector(".bararea").style.display = "none"
            }
        } else {
            summonEl.style.display = "none"
        }

    },
doAttack(attacking, attacked) {

    if(attacking.life <= 0 || attacked.life <= 0) {
        log.addmenssage("Someone has already died.")
        return
    }

    //Turns Sistem
    if(attacking !== this.currentTurn) {
        log.addmenssage("It's not that character's turn!")
        return
    }

    //Summon Protection System
    if(attacked.type === "necromancer" && attacked.summon && attacked.summon.life > 0) {

        const protectRoll = Math.random()
        if(protectRoll < 0.5) {
            attacked = attacked.summon
            log.addmenssage(`${attacked.name} protected the Necromancer!`)
        }
    }

    const attackFactor = parseFloat((Math.random() * 2).toFixed(2))
    const defenseFactor = parseFloat((Math.random() * 2).toFixed(2))

    const actualAttack = attacking.attack * attackFactor
    const actualDefense = attacked.defense * defenseFactor

    //Successful Attack
    if(actualAttack > actualDefense) {

        let damageDealt = Math.floor(actualAttack - actualDefense)

        //Critical System
        const critRoll = Math.random()
        let isCritical = false

        if(critRoll < attacking.critChance) {
            damageDealt *= 2
            isCritical = true
        }

        if(damageDealt < 0) {
            damageDealt = 0
        }

        //Main Damage
        attacked.life -= damageDealt
        attacked.life = attacked.life < 0 ? 0 : attacked.life

        //Combat Log
        if(isCritical) {
            log.addmenssage(`💥 CRITICAL! ${attacking.name} caused ${damageDealt} damage to ${attacked.name}`)
        } else {
            log.addmenssage(`${attacking.name} caused ${damageDealt} damage to ${attacked.name}`)
        }

        //New: Exclusive Necromancer System
        if(attacking.type === "necromancer") {

            //Summon Attack
            const summon = attacking.summon
            if(summon && summon.life > 0) {
                let summonDamage = summon.attack
                attacked.life -= summonDamage
                attacked.life = attacked.life < 0 ? 0 : attacked.life

                log.addmenssage(`${summon.name} caused ${summonDamage} extra damage!`)
            }

            //LifeSteal
            let healAmount = Math.floor(damageDealt / 2)
            attacking.life += healAmount
            if(attacking.life > attacking.maxlife) {
                attacking.life = attacking.maxlife
            }

            log.addmenssage(`${attacking.name} Drained ${healAmount} HP`)
        }
    } else {
        log.addmenssage(`${attacked.name} Defended Successfully!`)
    }

         //Turn Change
        this.currentTurn =
            this.currentTurn === this.fighter1
            ? this.fighter2
            : this.fighter1

        this.update()
        },

        //New: Heal Sistem
        doHeal(fighter, amount = 8) {
        if(fighter.life <= 0) {
            return
        }

        if(fighter !== this.currentTurn) {//Turn-based system to prevent infinite healing.
            log.addmenssage("It's not this character's Turn.!")
            return
        }

        fighter.life += amount

        if(fighter.life > fighter.maxlife) {
            fighter.life = fighter.maxlife
        }

        log.addmenssage(`${fighter.name} Recovered ${amount} HP`)

        this.currentTurn =
            this.currentTurn === this.fighter1
            ? this.fighter2
            : this.fighter1

        this.update()
        }
    }


const log = {
    list: [],
    addmenssage(msg) {//Function to add message
        this.list.push(msg)
        this.render()
    },
    render() {//Function to display the message on the screen.
        const logEl = document.querySelector(".log")
        logEl.innerHTML = ""

        for (let i in this.list) {
            logEl.innerHTML += `<li>${this.list[i]}</li>`
        }
    }
}