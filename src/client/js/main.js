import '../scss/styles.scss'

const song = document.querySelectorAll('.songList')
const playingCoverImg = document.querySelector('.playingCover__img')
const playingCover = document.getElementById('playingCover')
const playBtn = document.getElementById('playBtn')
const playIcon = playBtn.querySelector('i')
const audio = document.querySelector('audio')
const currentTime = document.getElementById('currentTime')
const totalTime = document.getElementById('totalTime')
const timeline = document.getElementById('timeline')
const muteBtn = document.getElementById('mute')
const muteBtnIcon = muteBtn.querySelector('i')
const volumeRange = document.getElementById('volume')
const playlistPlay = document.querySelectorAll('.playlistSelect')
const check = document.querySelector('.check')

let volumeValue = 0.5
audio.volume = volumeValue
let playingID = ''

playingCover.classList.add('paused')

playlistPlay.forEach((list) => {
	const playlistInfo = list.querySelector('.playlistInfo')
	const playlistImg = playlistInfo.querySelector('.playlistThumb')
	const playlistUrl = playlistInfo.dataset.audiourl
	const playlistID = playlistInfo.dataset.audioid
	const playlistTitle = playlistInfo.querySelector('.playlistTitle').innerText
	const playlistSinger = playlistInfo.querySelector('.playlistSinger').innerText
	const playingTitle = document.querySelector('.playingTitle')
	const playingSinger = document.querySelector('.playingSinger')
	const playlistDel = list.querySelector('.playlistDel')
	const hr = list.querySelector('.listHR')

	const clickMusic = () => {
		playIcon.className = 'fas fa-pause'
		playingCover.classList.remove('paused')
		playingCoverImg.src = playlistImg.src
		audio.src = playlistUrl
		playingTitle.innerText = playlistTitle
		playingSinger.innerText = playlistSinger
		playingID = playlistInfo.dataset.fetchaudio
		audio.dataset.audioid = playlistInfo.dataset.audioid
		check.innerText = 'playlist'
	}

	const clickDel = () => {
		fetch(`/api/song/${playlistID}/deleteplaylist`, { method: 'DELETE' })
		playlistDel.parentNode.remove()
		hr.remove()
	}

	playlistInfo.addEventListener('click', clickMusic)
	playlistDel.addEventListener('click', clickDel)
})

const handlePlayClick = () => {
	if (!audio.src) {
		if (playIcon.className === 'fas fa-play') {
			playIcon.className = 'fas fa-pause'
			playingCover.classList.remove('paused')
		} else if (playIcon.className === 'fas fa-pause') {
			playIcon.className = 'fas fa-play'
			playingCover.classList.add('paused')
		} else {
			return
		}
	} else {
		if (audio.paused) {
			playingCover.classList.remove('paused')
			playIcon.className = 'fas fa-pause'
			audio.play()
		} else {
			playingCover.classList.add('paused')
			playIcon.className = 'fas fa-play'
			audio.pause()
		}
	}
}

song.forEach((music) => {
	const songInfo = music.querySelector('.songInfo')
	const songCoverImg = songInfo.querySelector('.songCover__img')
	const songUrl = songInfo.dataset.audiourl
	const songTitle = songInfo.querySelector('.songTitle').innerText
	const songSinger = songInfo.querySelector('.songSinger').innerText
	const songDuration = songInfo.querySelector('.songDuration').innerText
	const playingTitle = document.querySelector('.playingTitle')
	const playingSinger = document.querySelector('.playingSinger')
	const addList = music.querySelector('.addList')

	const clickMusic = () => {
		playIcon.className = 'fas fa-pause'
		playingCover.classList.remove('paused')
		playingCoverImg.src = songCoverImg.src
		audio.src = songUrl
		playingTitle.innerText = songTitle
		playingSinger.innerText = songSinger
		playingID = songInfo.dataset.audioid
		check.innerText = 'musicrank'
	}

	const handleAddList = () => {
		fetch(`/api/song/${songInfo.dataset.audioid}/addplaylist`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				title: songTitle,
				thumbUrl: songCoverImg.src,
				singer: songSinger,
				fileUrl: songUrl,
				runningTime: songDuration,
				audioId: songInfo.dataset.audioid
			})
		})
	}

	songInfo.addEventListener('click', clickMusic)

	addList.addEventListener('click', () => {
		const login = document.querySelector('.login')
		if (login.innerText === 'Login') {
			alert('로그인 후 이용하세요.')
		} else {
			handleAddList()
			const myPlaylist = document.querySelector('.playList')
			const playlistSelect = document.createElement('div')
			playlistSelect.className = 'playlistSelect'
			const newPlaylist = document.createElement('div')
			newPlaylist.className = 'playlistInfo'
			const thumbUrl = document.createElement('img')
			thumbUrl.className = 'playlistThumb'
			thumbUrl.src = songCoverImg.src
			const playlistInfoSinger = document.createElement('div')
			playlistInfoSinger.className = 'playlistInfo-singer'
			const title = document.createElement('h4')
			title.innerText = songTitle
			const singer = document.createElement('h4')
			singer.innerText = songSinger
			const duration = document.createElement('h4')
			duration.innerText = songDuration
			playlistInfoSinger.appendChild(title)
			playlistInfoSinger.appendChild(singer)
			const icon = document.createElement('i')
			icon.className = 'fas fa-minus-square delete__playlist'

			newPlaylist.appendChild(thumbUrl)
			newPlaylist.appendChild(playlistInfoSinger)
			newPlaylist.appendChild(duration)
			playlistSelect.appendChild(newPlaylist)
			playlistSelect.appendChild(icon)
			myPlaylist.appendChild(playlistSelect)
			newPlaylist.addEventListener('click', clickMusic)

			icon.addEventListener('click', () => {
				icon.parentNode.remove()
			})
		}
	})
})

const handleHitSpace = (event) => {
	if (event.keyCode == 32) {
		event.preventDefault()
		handlePlayClick()
	}
}

const formatTime = (seconds) => new Date(seconds * 1000).toISOString().substr(14, 5)

const handleLoadedMetadata = () => {
	totalTime.innerText = formatTime(Math.floor(audio.duration))
	timeline.max = Math.floor(audio.duration)
}

const handleTimeUpdate = () => {
	currentTime.innerText = formatTime(Math.floor(audio.currentTime))
	timeline.value = Math.floor(audio.currentTime)
}

const handleTimelineChange = (event) => {
	const {
		target: { value }
	} = event
	audio.currentTime = value
}
const handleHitRightArrow = (event) => {
	if (event.keyCode == 39) {
		event.preventDefault()
		audio.currentTime = audio.currentTime + 5
	}
}
const handleHitLeftArrow = (event) => {
	if (event.keyCode == 37) {
		event.preventDefault()
		audio.currentTime = audio.currentTime - 5
	}
}

const handleMuteClick = () => {
	if (audio.muted) {
		audio.muted = false
	} else {
		audio.muted = true
	}
	muteBtnIcon.classList = audio.muted ? 'fas fa-volume-mute' : 'fas fa-volume-up'
	volumeRange.value = audio.muted ? 0 : volumeValue
}

const handleVolumeChange = (event) => {
	const {
		target: { value }
	} = event
	volumeValue = value
	audio.volume = value
}

const handleEnded = () => {
	playingCover.classList.add('paused')
	fetch(`/api/song/${playingID}/listener`, { method: 'POST' })
}

timeline.addEventListener('input', handleTimelineChange)
playBtn.addEventListener('click', handlePlayClick)
window.addEventListener('keydown', handleHitSpace)
audio.addEventListener('loadeddata', handleLoadedMetadata)
audio.addEventListener('timeupdate', handleTimeUpdate)
audio.addEventListener('ended', handleEnded)
window.addEventListener('keydown', handleHitRightArrow)
window.addEventListener('keydown', handleHitLeftArrow)
muteBtn.addEventListener('click', handleMuteClick)
volumeRange.addEventListener('input', handleVolumeChange)
