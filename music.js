// gif https://giphy.com/gifs/harrison-ford-blade-runner-ridley-scott-xgwNjDr8aRqyA
// fullscreen cmd shift f
const clips = [
	"https://ia800608.us.archive.org/30/items/05.EdvardGriegWaltz1866/05.%20Edvard%20Grieg%20-%20Waltz%2C%201866.mp3",
	"https://ia801607.us.archive.org/33/items/08MarcAntoineCharpentierTeDeumPrelude1698/08%20Marc%20Antoine%20Charpentier%20-%20Te%20Deum%2C%20Prelude%2C%201698.mp3",
	"https://ia801607.us.archive.org/10/items/34.RichardWagnerTannhauserOverture/34.%20Richard%20Wagner%20-%20Tannhauser%20Overture.mp3",
	"https://ia800605.us.archive.org/21/items/18.WolfgangAmadeusMozartSymphonyNo.41/18.%20Wolfgang%20Amadeus%20Mozart%20-%20Symphony%20No.41.mp3",
	"https://ia800803.us.archive.org/11/items/34JohannSebastianBachSleepersWake1731/34%20Johann%20Sebastian%20Bach%20-%20Sleepers%20Wake%2C%201731.mp3",
	"https://ia800807.us.archive.org/21/items/26GiacomoPucciniLaBoheme1896/26%20Giacomo%20Puccini%20-%20La%20Boheme%2C%201896.mp3",
	"https://ia800803.us.archive.org/16/items/20ClaudeDebussyPreludeALapresMidi1894/20%20Claude%20Debussy%20-%20Prelude%20a%20lapres%20midi%2C%201894.mp3",
	"https://ia800608.us.archive.org/30/items/05.EdvardGriegWaltz1866/05.%20Edvard%20Grieg%20-%20Waltz%2C%201866.mp3",
	"https://ia800801.us.archive.org/25/items/27GeorgeFridericHandelSeeTheConqueringHerComes1746/27%20George%20Frideric%20Handel%20-%20See%20the%20conquering%20Her%20Comes%2C%201746.mp3",
	"https://ia800603.us.archive.org/28/items/11.FranzGruberSilentNight1818/11.%20Franz%20Gruber%20-%20Silent%20Night%2C%201818.mp3",
	"https://ia800604.us.archive.org/15/items/26.AntonioVivaldiMandlinConcerto/26.%20Antonio%20Vivaldi%20-%20Mandlin%20Concerto.mp3",
	"https://ia801604.us.archive.org/24/items/23FelixMendelssohnSpringSong1844/23%20Felix%20Mendelssohn%20-%20Spring%20song%2C%201844.mp3",
	"https://ia800800.us.archive.org/6/items/17GeorgPhilippTelemannFantasiasForFlute1732/17%20Georg%20Philipp%20Telemann%20-%20Fantasias%20for%20Flute%2C%201732.mp3",
	"https://ia800604.us.archive.org/28/items/38.KarlMariaWeberDerFreischutzOverture1821/38.%20Karl%20Maria%20Weber%20-%20Der%20Freischutz%2C%20Overture%2C%201821.mp3",
	"https://ia800608.us.archive.org/29/items/13.FranzJosephHaydnSymphonyNo.94/13.%20Franz%20Joseph%20Haydn%20-%20Symphony%20No.94.mp3",
	"https://ia800603.us.archive.org/16/items/23WolfgangAmadeusMozartIdomeneoOverture1780/23%20Wolfgang%20Amadeus%20Mozart%20-%20Idomeneo%20Overture%2C%201780.mp3",
	"https://ia800602.us.archive.org/12/items/28.FredericChopinWaltz1838_201706/28.%20Frederic%20Chopin%20-%20Waltz%2C%201838.mp3"
];

document.onload = function () {
	//
	// let rand_silence = Math.floor(Math.random() * 2500) + 5000;
	// var clip_repeat = setInterval(loadClip, rand_silence);
	var audio = document.getElementById("audio");
	audio.src = clips[Math.floor(Math.random() * clips.length - 1)];
	playTrack();
	function playTrack() {
		let rand_silence = Math.floor(Math.random() * 2500) + 10000;
		setTimeout(function () {
			loadClip();
			playTrack();
		}, rand_silence);
	}

	function loadClip() {
		var audio = document.getElementById("audio");
		audio.volume = .001;
		var playPromise = audio.play();
		if (playPromise !== undefined) {
			playPromise.then(_ => {
				audio.pause();
				getSoundAndFadeAudio();
			})
				.catch(error => {
					console.log("error");
					console.log(error.message);
				});
		}
	}

}();

function getSoundAndFadeAudio() {
	var sound = document.getElementById("audio");
	let rand_start = Math.floor(Math.random() * sound.duration);
	let rand_end = (Math.random() * .25) + .8;
	sound.currentTime = rand_start;
	let startTime = sound.currentTime;
	sound.volume = .05;
	sound.play();
	var fadeAudio = setInterval(function () {
		if (sound.duration > 0 && !sound.paused) {
			if (sound.volume < .05) {
				sound.pause();
				let random_clip = clips[Math.floor(Math.random() * clips.length )];
				sound.src = random_clip;
				clearInterval(fadeAudio);
			}
			if (sound.currentTime >= startTime + rand_end) {
				sound.volume -= 0.01;
			} else {
				sound.volume += 0.01;
			}
		}
	}, 100);
}