import DecibelMeter from 'decibel-meter'

class DecMeter extends DecibelMeter {
    constructor (id) {
        super(id)
        console.log('db-meter')
        this.current_level = 0
        // подключить к 0му потоку и направить вывод в переменную this.current_level
    }

    getLevel() {
      // вернуть текущий уровень децибел
      return
    }

    getSpeed(coef=3) {
      // вернуть скорость прыжка
      return
    }
}

export default DecMeter
