import DecibelMeter from 'decibel-meter'

class DecMeter extends DecibelMeter {
    constructor (id) {
        super(id)
        this.current_level = 0
        this.listenTo(0, (dB, percent, value) => this.current_level = value)
    }

    getLevel() {
      return this.current_level
    }

<<<<<<< HEAD
    getSpeed(coef=2000) {
=======
    getSpeed(coef=1000) {
>>>>>>> feature013
      return this.current_level * coef
    }
}

export default DecMeter
