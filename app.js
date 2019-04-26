new Vue({
    el: '#app',
    data: {
        play: false,
        playerTotal: 100,
        monsterTotal: 100,
        playerPoints: null,
        monsterPoints: null,
        healPoints: null,
        attacks: []
    },
    computed: {
        isDisabled(){
            return this.playerTotal >= 100 ? true : false
        },
        playerWidth(){
            return this.playerTotal < 0 ? 0 : this.playerTotal + '%'
        },
        monsterWidth(){
            return this.monsterTotal < 0 ? 0 : this.monsterTotal + '%'
        },
        // turn() {
        //     const who = attack.split(" ")[0];
        //     console.log(who)
        // }
    },
    methods: {
        monsterAtack() {
            return [
                this.monsterPoints= Math.floor(Math.random() * 10) + 1,
                this.monsterTotal = this.monsterTotal - this.playerPoints,
                this.attacks.push(`MONSTER HITS PLAYER FOR ${this.monsterPoints}`)
            ]
        },
        attack(name){
            if(name !== 'special') {
                return [
                    this.playerPoints= Math.floor(Math.random() * 10) + 1,
                    this.monsterAtack(),
                    this.playerTotal = this.playerTotal - this.monsterPoints,
                    this.attacks.push(`PLAYER HITS MONSTER FOR ${this.playerPoints}`)
                ]
            } else {
               return [
                    this.playerPoints= Math.floor(Math.random() * 10) + 10,
                    this.monsterAtack(),
                    this.playerTotal = this.playerTotal - this.monsterPoints,
                    this.attacks.push(`PLAYER HITS MONSTER FOR ${this.playerPoints}`)
                ]
            }
        },
        heal(){
            if (this.playerTotal < 100 && this.playerTotal > 90) {
                return [
                    this.playerPoints= 0,
                    this.healPoints= Math.floor(Math.random() * 10) + 1,
                    this.monsterAtack(),
                    this.playerTotal = this.playerTotal + this.healPoints - this.monsterPoints,
                    this.playerTotal > 100 ? this.playerTotal = 100 : this.playerTotal = this.playerTotal,
                    this.attacks.push(`PLAYER HEALS HERSELF FOR ${this.healPoints}`)
                ]
            } else {
                return [
                    this.playerPoints= 0,
                    this.monsterAtack(),
                    this.healPoints= Math.floor(Math.random() * 10) + 1,
                    this.playerTotal = this.playerTotal + this.healPoints - this.monsterPoints,
                    this.attacks.push(`PLAYER HEALS HERSELF FOR ${this.healPoints}`)
                ]
            }
        },
        newGame(){
            return [
                this.play = true,
                this.playerTotal = 100,
                this.monsterTotal = 100,
                this.playerPoints = null,
                this.monsterPoints= null,
                this.attacks = []
            ]
        }
    },
    watch: {
        playerTotal(){
            if(this.playerTotal < 0){
                return (
                    setTimeout(() => {
                        alert("MONSTER WON"),
                        this.newGame()
                    }, 200)
                )
            }
        },
        monsterTotal(){
            if(this.monsterTotal < 0){
                return (
                    setTimeout(() => {
                        alert("YOU WON"),
                        this.newGame()
                    }, 200)
                )
            }
        }
    }
})