const char = createNecromancer("Lydia")
const Monster = createLittleMonster()

stage.start (
    char,
    Monster,
    document.querySelector("#char"),
    document.querySelector("#monster"),
    document.querySelector("#summon")
)