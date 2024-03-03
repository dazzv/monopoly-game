import { createStore, storeKey } from 'vuex';
import zonesData from '../game_data/createBoard';
import chanceCards from '../game_data/chanceCards';
import communityChestCards from '../game_data/communityChestCards';

export default createStore({
  actions: {
    addNewPlayer({commit}, newPlayer){
      commit('addNewPlayerM', newPlayer)
    },
    removePlayer({commit}, player){
      commit('removePlayerM', player)
    },
    startTheGame({commit}, data){
      commit('startTheGameM', data)
    },
    async goToNewPosition({commit, getters}, diceData){
      if(getters.currentPlayer.isInJail === 0 || diceData.firstCube === diceData.secondCube){
        await commit('removeFromZoneM')
        await commit('goToNewPositionM', diceData)
  
        const validTypes = ['city', 'chance', 'utility', 'communityChest', 'tax', 'railroad', 'jail',]; 
        if (!validTypes.includes(getters.currentZone.type)) {
          setTimeout(() => {
            commit('queueM')
          }, 0);
        }   
      } else {
          commit('queueM')
      }
          
    },

    addToQueue({commit},){
      commit('queueM') // очередь
    },

    async transactions({commit, getters}, type){ // Транзакции
      switch (type){
        case 'city':
          await commit('cityTransactions');
          await commit('queueM')
          break
      
        case 'utility':
          await  commit('utilityTransactions')
          await commit('queueM')
          break;

        case 'chance':
          await  commit('chanceCardZone', getters.chanceCard.step)
          await this.dispatch('goToNewPosition', getters.dice)
          break;

        case 'communityChest':
          await  commit('chestTransactions', getters.chestCard.balance)
          await commit('queueM')
          break;
        
        case 'tax':
          await  commit('taxCardZone', getters.currentZone.price)
          await commit('queueM')
          break;

        case 'railroad':
          await  commit('railroadCardZone')
          await commit('queueM')
          break;

        case 'jail':
          await commit('toJail')
          await commit('queueM')
          break
      }
    },
    sellCard({commit}, card){
      commit('sellCardM', card)
    },

    showCardsInfo({commit}){
      commit('showCardsInfoM')
    },
    hidePlayerCardsInfo({commit}){
      commit('hidePlayerCardsInfoM')
    },

    async goToStation({commit, getters}, toStation){
      await commit('goToStationM', toStation)
      await commit('queueM')

    },

    outFromJail({commit}, payOrDubl){
      commit('outWithPayOrDubl', payOrDubl)
    },
    
    isEndGame({commit}, msg){
      commit('isEndGameM', msg)
    },

  },

  mutations: {
      addNewPlayerM(state, newPlayer){
        state.players.push(newPlayer)
      },
      removePlayerM(state, playerId){
        state.players = state.players.filter((player) => player.id !== playerId)
      },
      startTheGameM(state, data){
        state.isStarted = data
        state.currentPlayer = state.players[0]
        state.zones[0].players = state.players
      },
      
      removeFromZoneM(state){
        const currentZone = state.currentPlayer.position
        state.zones[currentZone].players = state.zones[currentZone].players.filter((player) => player.id !== state.currentPlayer.id) 
      },
      goToNewPositionM(state, diceData){
        state.diceData = diceData

        if(state.currentPlayer.position + diceData.sum >= 40){ // Если игрок после хода заканчивает круг то начинается новый
          const newRound = state.currentPlayer.position += diceData.sum
          const newPosition = newRound - 40
          state.currentPlayer.position = newPosition
          state.currentPlayer.balance += 200 // Награда за окончание круга
        } else{
          state.currentPlayer.position += diceData.sum
        }

        const currentZone = state.zones[state.currentPlayer.position]    
        currentZone.players.push(state.currentPlayer)

        if(currentZone.type === 'chance' || currentZone.type === 'communityChest'){ // выбираем рандомную карточку шанса
          state.randomIndex = Math.floor(Math.random() * chanceCards.length);
        }
        // проверяем тип зоны, чтобы не вывести карточки зон старта и других не нужных
        const validTypes = ['city', 'chance', 'utility', 'communityChest', 'tax', 'railroad', 'jail']; 
        if (validTypes.includes(currentZone.type)) {
          state.zoneInfo = true
        } else {
          state.zoneInfo = false
        }
      },

      queueM(state){ // Очередь
        const diceData = state.diceData;
        const id = state.currentPlayer.id;
        
        if (diceData.firstCube === diceData.secondCube) { //Проверяем на наличие дубля
          state.currentPlayer = state.currentPlayer   // Если дубль то переключаться на другого игрока не будем
          if(state.currentPlayer.isInJail === 1){ // Если он в тюрьме, то после дубль освобождаемы
            state.currentPlayer.isInJail = 0
          }
        }
        else {
          if(id < state.players.length - 1){
            state.currentPlayer = state.players[id + 1]  // переключаемся на другого       
          } else{ // Если это последний игрок, то переключаемся на первого
            state.currentPlayer = state.players[0]
          }
        } 

        state.zoneInfo = false
        
        if(state.currentPlayer.isInJail === 1){
          this.commit('inJail')
        }
        if(state.currentPlayer.balance <= 0){ // проверяем баланс // endGame
          state.warningMsg = true
        }
      },

      cityTransactions(state){
        const currentPlayer = state.currentPlayer
        const currentZone = state.zones[state.currentPlayer.position]

        if(currentZone.owner){
          const rentLevels = {  // уровень ренты и цена карточки
            0: 0.1,             // здесь я использовал объекты вместе switch case
            1: 0.4, // типо, если уровень ренты 1 то рента умножается на 40%
            2: 1.0,
            3: 2.0,
            4: 3.0
          };
          
          if( currentPlayer.name !== currentZone.owner){  // Если чей то зона то оплачиваем ренту
            currentPlayer.balance -= currentZone.price * rentLevels[currentZone.renta]; //минусуем из баланса стоимость зоны умноженную на соответсвующий процент
            // И перечислим деньги владельцу
            const owner = state.players.filter((player) => player.name === currentZone.owner)
            owner[0].balance += currentZone.price * rentLevels[currentZone.renta];
          }

          //После повышаем уровень ренты и цену
          if(currentZone.renta < 4){ // Если уровень еще нижу 4
            currentZone.renta += 1
            currentZone.rentaSum = currentZone.price * rentLevels[currentZone.renta];
          }
          
        } 
        else { // Если зона свободна, то покупаем
            currentZone.owner = currentPlayer.name;
            currentPlayer.balance -= currentZone.price
            currentPlayer.propertyCards.push(currentZone)
        }

      },
      utilityTransactions(state){
        const currentPlayer = state.currentPlayer
        const currentZone = state.zones[state.currentPlayer.position]
        
        if(currentZone.owner){ // смотрим есть ли владелец 
          if(currentZone.owner !== currentPlayer.name){ // если чужая зона
            const allUtilityCards = state.zones.filter((element) => element.type === 'utility') // найдем все зоны такого типа
            const allUtilityCardWithOneOwner = allUtilityCards.filter((element) => element.owner === currentZone.owner) // посмотим все ли они принадлежат одному человеку, если да то умножаем на 10            const
            const owner = state.players.filter((player) => player.name === currentZone.owner) // находим самого владельца чтобы ему деньги перечислит

            if(allUtilityCardWithOneOwner.length >= 2){
              currentPlayer.balance -= state.diceData.sum * 10
              owner[0].balance += state.diceData.sum * 10
            } else {
              currentPlayer.balance -= state.diceData.sum * 4
              owner[0].balance += state.diceData.sum * 4
            }
          }
        } 
        else { // если владельца нет то покупка идет
          currentZone.owner = currentPlayer.name;
          currentPlayer.balance -= currentZone.price
          currentPlayer.utilitiesCards.push(currentZone)
        }
      },
      sellCardM(state, card){
        state.currentPlayer.balance += (card.price / 2)
        card.owner = null
        card.renta = 0
        card.rentaSum = card.price * 0.10

        switch(card.type){
          case 'city':
            state.currentPlayer.propertyCards = state.currentPlayer.propertyCards.filter(el => el.name !== card.name)
            break
          case 'railroad':
            state.currentPlayer.railroadsCards = state.currentPlayer.railroadsCards.filter(el => el.name !== card.name)
            card.renta = 1
            card.rentaSum = 25
            break
          case 'utility':
            state.currentPlayer.utilitiesCards= state.currentPlayer.utilitiesCards.filter(el => el.name !== card.name)
            break
        }

        if(state.currentPlayer.balance >= 0){
          state.warningMsg = false
        }
      },

      chanceCardZone(state, chanceCardStep){
        state.diceData.sum = chanceCardStep
      },
      chestTransactions(state, Cash){
        const currentPlayer = state.currentPlayer
        currentPlayer.balance += Cash
      },
      taxCardZone(state, taxValue){
        state.currentPlayer.balance -= taxValue
      },
      railroadCardZone(state){
        const currentPlayer = state.currentPlayer
        const currentZone = state.zones[state.currentPlayer.position]
      
        if(currentZone.owner !== null){ // смотрим есть ли владелец 
          if(currentZone.owner !== currentPlayer.name) { // если чужая зона
            currentPlayer.balance -= currentZone.rentaSum;
            // Перечислим деньги собственнику
            const owner = state.players.filter((player) => player.name === currentZone.owner);
            owner[0].balance += currentZone.rentaSum;           
          }

        } else { // если владельца нет то покупка идет
          currentZone.owner = currentPlayer.name;
          currentPlayer.balance -= currentZone.price;
          currentPlayer.railroadsCards.push(currentZone)

          const allRailroadCards = state.zones.filter((element) => element.type === 'railroad');
          const allRailroadCardsWithOneOwner = allRailroadCards.filter((element) => element.owner === currentZone.owner);

          const railroadRentValues = {
            1: { rentaSum: 25, renta: 1 },
            2: { rentaSum: 50, renta: 2 },
            3: { rentaSum: 100, renta: 3 },
            4: { rentaSum: 200, renta: 4 }
          };

          const rentaValues = railroadRentValues[allRailroadCardsWithOneOwner.length] || railroadRentValues[1]; // По умолчанию для одного владения

          allRailroadCardsWithOneOwner.forEach((card) => {
            card.rentaSum = rentaValues.rentaSum;
            card.renta = rentaValues.renta;
          });
        }

      },
      
      showCardsInfoM(state){
        state.playersCardsInfo = true
      },
      hidePlayerCardsInfoM(state){
        state.playersCardsInfo = false
      },

      goToStationM(state, toStation){
        const currentZone = state.zones[state.currentPlayer.position]
        currentZone.players = currentZone.players.filter((player) => player.name !== state.currentPlayer.name)

        let index = state.zones.findIndex(el => el.name === toStation.name);
        
        state.zones[index].players.push(state.currentPlayer)
        state.currentPlayer.position = index
      },

      toJail(state){
        state.zones[state.currentPlayer.position].players = state.zones[state.currentPlayer.position].players.filter((player) => player.name !== state.currentPlayer.name) //удаляем из старой зоны
        
        let index = state.zones.findIndex(el => el.type === 'visit'); //найдем индекс тюрьмы
        state.zones[index].players.push(state.currentPlayer)
        state.currentPlayer.isInJail = 1;
        state.currentPlayer.position = index;
      },
      inJail(state){
        state.zoneInfo = true;
      },
      outWithPayOrDubl(state, payOrDubl){
        if(payOrDubl === 'pay'){
          state.currentPlayer.balance -= 150
          state.currentPlayer.isInJail = 0
          state.zoneInfo = false;
        } else{
          state.zoneInfo = false;
        }
        
      },

      isEndGameM(state, msg){
        if(msg === 'sell'){
          state.playersCardsInfo = true;
          if(!state.currentPlayer.railroadsCards.length && !state.currentPlayer.utilitiesCards.length && !state.currentPlayer.propertyCards.length){
            state.gameOver = true
            state.playersCardsInfo = false
            state.warningMsg = false
          }

        } else if(msg === 'gameOver'){
          state.gameOver = true
          state.playersCardsInfo = false
          state.warningMsg = false
        }
        
      },

  },

  state: {
    zones: zonesData,
    chanceCards: chanceCards,
    chestCards: communityChestCards,

    players: [],
    currentPlayer: null,

    zoneInfo: false,
    playersCardsInfo: false,
    isStarted: null,
    diceData: {},
    randomIndex: null,

    warningMsg: false,
    gameOver: false,

  },
  
  getters: {
    zonesData: (state) => {
      return state.zones
    },
    allPlayers: (state) => {
      return state.players
    },

    started: (state) => {
      return state.isStarted
    },

    currentPlayer: (state) => {
      return state.currentPlayer
    },
    currentZone: (state) => {
      return state.zones[state.currentPlayer.position]
    },

    zoneInfo: (state) => {
      return state.zoneInfo
    },
    playersCardsInfo: (state) => {
      return state.playersCardsInfo
    },

    chanceCard: (state) => {
      return state.chanceCards[state.randomIndex]
    },
    chestCard: (state) => {
      return state.chestCards[state.randomIndex]
    },

    dice: (state) =>{
      return state.diceData
    },
    
    warningMsg: (state) => {
      return state.warningMsg
    },
    gameOver: (state) => {
      return state.gameOver
    }
  },

  modules: {
  }
})
