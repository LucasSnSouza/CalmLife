import { defineStore } from "pinia";
import { Howl } from "howler"

export const useEnvironmentStore = defineStore('environment', {
    state: () => ({
        environment_show: false,
        environment_sounds: [],
    }),
    getters: {
        getEnvironmentSounds: (state) => state.environment_sounds,
        getEnvironmentShow: (state) => state.environment_show
    },
    actions: {
        addEnvironment(sound_data){
            const sound = new Howl({
                src: [`/sounds/${sound_data.sound}.mp3`],
                loop: true,
                volume: 0.5, 
            })
            sound.play()
            this.environment_sounds.push(
                {
                    ...sound_data,
                    howl: sound
                }
            )
        },
        setVolume(index, volume){
            this.environment_sounds[index].howl.volume(volume / 100)
        },
        togglePause(index){
            if (this.environment_sounds[index].howl.playing()) {
                this.environment_sounds[index].howl.pause()
            } else {
                this.environment_sounds[index].howl.play()
            }
        },
        toggleEnvironmentInterface(){
            this.environment_show = !this.environment_show
        }
    }
})