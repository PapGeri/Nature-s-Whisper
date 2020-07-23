/*
 * Author : AdNovum Informatik AG
 */

export class SoundHandler {
	private audio: HTMLAudioElement;
	private context: AudioContext;
	private sourceNode: AudioNode;
	private gainVolumeNode: GainNode;
	private gainToneNode: BiquadFilterNode;

	//Connecting the nodes together
	constructor(path: string) {
		this.audio = new Audio(path);
		this.audio.loop = true;
		this.context = new AudioContext();
		this.sourceNode = this.context.createMediaElementSource(this.audio);

		this.gainVolumeNode = this.context.createGain();
		this.gainToneNode = this.context.createBiquadFilter();

		this.sourceNode.connect(this.gainVolumeNode).connect(this.context.destination);
	}

	startSound() {
		//This is needed because of the autoplay policy
		if(this.context.state === 'suspended'){
			this.context.resume();
		}
		this.audio.play();
	}

	stopSound() {
		this.audio.pause();
	}

	setVolume(volume: number) {
		this.gainVolumeNode.gain.value = volume;
	}

	//lowpass type: frequencies below the cutoff pass through, the rest is attenuated
	activateTone(value: number) {
		this.gainToneNode.type = 'lowpass';
		this.gainToneNode.frequency.value = value;
		this.gainVolumeNode.connect(this.gainToneNode);
		this.gainToneNode.connect(this.context.destination);
	}

	deactivateTone() {
		this.gainToneNode.disconnect();
	}
}