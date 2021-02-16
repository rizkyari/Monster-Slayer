function getRandomValue(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth : 100,
            monsterHealth : 100,
            currentRound: 0
        };
    },
    computed:{
        monsterBarStyle(){
            return {
                width: this.monsterHealth + '%'
            };
        },
        playerBarStyle(){
            return {
                width: this.playerHealth + '%'
            };
        },
        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
        mayUseHealingMagic(){
            return this.currentRound % 5 !== 0;
        }
    },
    methods: {
        attackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(5, 12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8, 15);
            this.playerHealth -= attackValue;
        },
        attackPlayerWhenHealing(){
            const attackValue = getRandomValue(3, 8);
            this.playerHealth -= attackValue;
        },
        specialAttackMonster(){
            this.currentRound ++;
            const attackValue = getRandomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8, 20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else {
                this.playerHealth += healValue;
            }
            this.attackPlayerWhenHealing();
        }
    }
});

app.mount('#game');