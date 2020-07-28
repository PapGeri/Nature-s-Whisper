export class SoundHandler {
	private readonly audio: HTMLAudioElement;
	private readonly context: AudioContext;
	private readonly sourceNode: AudioNode;
	private readonly volumeNode: GainNode;
	private readonly toneNode: BiquadFilterNode;

	//Connecting the nodes together
	constructor(path: string) {
		this.audio = new Audio(path);
		this.audio.loop = true;
		this.context = new AudioContext();
		this.sourceNode = this.context.createMediaElementSource(this.audio);

		this.volumeNode = this.context.createGain();
		this.toneNode = this.context.createBiquadFilter();

		this.sourceNode.connect(this.volumeNode).connect(this.context.destination);
	}

	startSound() {
		//This is needed because of the autoplay policy
		if (this.context.state === 'suspended') {
			this.context.resume();
		}
		this.audio.play();
	}

	stopSound() {
		this.audio.pause();
	}

	setVolume(volume: number) {
		this.volumeNode.gain.value = volume;
	}

	//lowpass type: frequencies below the cutoff pass through, the rest is attenuated
	activateTone(value: number) {
		this.toneNode.type = 'lowpass';
		this.toneNode.frequency.value = value;
		this.volumeNode.connect(this.toneNode);
		this.toneNode.connect(this.context.destination);
	}

	deactivateTone() {
		this.toneNode.disconnect();
	}
}