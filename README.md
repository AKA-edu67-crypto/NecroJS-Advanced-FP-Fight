# ⚔️ RPG Combat System in JavaScript

A study project focused on programming logic, RPG combat systems, and gameplay architecture using **functional JavaScript**.

The goal of the project was to evolve a simple battle system into something more organized, scalable, and with its own mechanics, 
with the **Necromancer** class being the main focus and highlight.

---

# 📚 Technologies

* JavaScript Vanilla
* HTML
* CSS

---

# 🎮 Implemented Systems

## ✅ Combat System

The combat system includes:

* attack
* defense
* damage calculation
* critical hits
* turn system
* healing
* summons
* combat logs

---

## ☠️ Necromancer

A special class created for the project.

Features:

* exclusive summon
* lifesteal
* hybrid combat style
* unique mechanics

### Features

* high defense
* moderate damage
* summon companion
* life drain

---

# 👹 Summon System

The Necromancer owns an exclusive summon:

```javascript
summon: {
    name: "Capirotinho",
    life: 20,
    maxlife: 20,
    attack: 6,
    defense: 3
}
```

---

## 🔥 What the Summon Does

### ✅ Extra Attack

Whenever the Necromancer attacks:

1. the main attack happens
2. the summon follows up with bonus damage

---

### ✅ Protection System

The summon has a chance to:

* intercept attacks
* protect the Necromancer

Flow:

```text
Enemy attacks Necromancer
↓
Protection chance rolls
↓
Summon receives the damage instead
```

---

### ✅ Summon Death System

The summon can:

* take damage
* die
* disappear visually

When defeated, the UI displays:

```text
"Capirotinho is out of battle"
```

---

# 💥 Critical Hit System

Each character has:

```javascript
critChance
```

---

## How It Works

The system uses:

```javascript
Math.random()
```

to calculate critical hit chance.

---

## Effect

When a critical hit occurs:

```text
damage × 2
```

---

## Example

```javascript
if(critRoll < attacking.critChance) {
    damageDealt *= 2
}
```

---

# ❤️ Lifesteal System

Exclusive to the Necromancer and what makes it special.

Whenever the Necromancer deals damage:

* part of the damage is converted into healing

---

## Formula

```javascript
healAmount = damageDealt / 2
```

---

## Purpose

To give the class a unique combat identity.

---

# 🔄 Turn System

Combat works through alternating turns.

---

## How It Works

The variable:

```javascript
currentTurn
```

controls who can act.

---

## Actions Blocked Outside Turn

* attacking
* healing

---

## Flow

```text
Player 1 acts
↓
Turn changes
↓
Player 2 acts
↓
Turn changes
```

---

# 🩹 Healing System

Characters can recover health using:

```javascript
doHeal()
```

---

## Rules

* only usable during the player's turn
* cannot exceed max HP
* cannot be used while dead

---

# 📜 Combat Log System

The project contains dynamic combat logs for:

* attacks
* critical hits
* defense
* summon attacks
* healing
* lifesteal

---

## Example

```text
💥 CRITICAL! Lydia dealt 24 damage to Big Monster
Capirotinho dealt 6 bonus damage!
Lydia drained 12 HP
```

---

# 🧠 Project Architecture

The project was structured using:

# Functional JavaScript

---

## Main Structure

### Character Factories

```javascript
createBarbarian()
createAssassin()
createNecromancer()
```

Responsible for:

* creating characters
* defining stats
* defining class mechanics

---

## `stage` Object

Responsible for:

* combat
* turns
* rendering
* UI updates
* core game logic

---

## `update()` Method

The visual core of the system.

Responsible for:

* updating HP
* updating health bars
* showing/hiding summon UI
* rendering combat states

---

# 🧩 Combat Flow

## Main Flow

```text
Turn validation
↓
Attack/Defense calculation
↓
Damage calculation
↓
Critical hit check
↓
Damage application
↓
Summon attack
↓
Lifesteal
↓
UI update
↓
Turn switch
```

---

# 🎯 Project Goals

This project was created to practice:

* programming logic
* JavaScript fundamentals
* gameplay architecture
* combat systems
* gradual system expansion

---

# 🚀 Future Expansions

* mana system
* multiple summons
* buffs/debuffs
* status effects
* enemy AI
* inventory system
* special abilities
* advanced turn combat
* multiple enemies
* leveling system
* save/load system

---

# 📌 Learning Outcomes

During development, the project explored:

* object manipulation
* gameplay flow
* dynamic rendering
* code organization
* separation of responsibilities
* state management
* gameplay architecture

---

# 👨‍💻 Author

Project developed for study purposes and programming growth.
Thanks for reading this far 🤟
