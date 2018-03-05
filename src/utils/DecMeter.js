import DecibelMeter from 'decibel-meter'

class DecMeter extends DecibelMeter {
    constructor (id) {
        super('unique-id')
        let db_level
        this.meter.listenTo(0, (dB, percent, value) => db_level)
    }

}

export default DecMeter