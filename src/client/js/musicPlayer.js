const rankArea = document.querySelector('.rankArea')
const songInfo = rankArea.querySelectorAll('.songInfo')

const check = document.querySelector('.check')

const getSongInfoArr = Array.from(songInfo)
const rankArr = getSongInfoArr.map((e) => location.href + e.dataset.audiourl)
const rankImgArr = getSongInfoArr.map((e) => location.href + e.dataset.imgurl)
const rankTitleArr = getSongInfoArr.map((e) => e.dataset.title)
const rankSingerArr = getSongInfoArr.map((e) => e.dataset.singer)

const playlist = document.querySelector('.playList')
const playlistInfo = playlist.querySelectorAll('.playlistInfo')
const getPlaylistArr = Array.from(playlistInfo)
const playlistArr = getPlaylistArr.map((e) => location.href + e.dataset.audiourl)
const playlistImgArr = getPlaylistArr.map((e) => e.dataset.imgurl)
const playlistTitleArr = getPlaylistArr.map((e) => e.dataset.title)
const playlistSingerArr = getPlaylistArr.map((e) => e.dataset.singer)
const playlistIDArr = getPlaylistArr.map((e) => e.dataset.audioid)

const playingCover = document.getElementById('playingCover')
const playingCoverImg = document.querySelector('.playingCover__img')
const playingTitle = document.querySelector('.playingTitle')
const playingSinger = document.querySelector('.playingSinger')

const audio = document.querySelector('audio')

const nextBtn = document.querySelector('.fa-step-forward')
const prevBtn = document.querySelector('.fa-step-backward')

const autoNext = () => {
	if (check.innerText === 'musicrank') {
		let playingIdx = rankArr.findIndex((e) => e === audio.src)
		if (playingIdx + 1 < rankArr.length) {
			audio.src = rankArr[playingIdx + 1]
			console.log(rankArr)
			playingCoverImg.src = rankImgArr[playingIdx + 1]
			playingTitle.innerText = rankTitleArr[playingIdx + 1]
			playingSinger.innerText = rankSingerArr[playingIdx + 1]
			playingCover.classList.remove('paused')
		} else {
			alert('LAST SONG OF MUSIC RANK')
		}
	} else {
		let playingIdx = playlistIDArr.findIndex((e) => e === audio.dataset.audioid)
		if (playingIdx + 1 < playlistArr.length) {
			audio.src = playlistArr[playingIdx + 1]
			playingCoverImg.src = playlistImgArr[playingIdx + 1]
			playingTitle.innerText = playlistTitleArr[playingIdx + 1]
			playingSinger.innerText = playlistSingerArr[playingIdx + 1]
			audio.dataset.audioid = playlistIDArr[playingIdx + 1]
			playingCover.classList.remove('paused')
		} else {
			alert('LAST SONG OF PLAY LIST')
		}
	}
}

const prevMusic = () => {
	if (check.innerText === 'musicrank') {
		let playingIdx = rankArr.findIndex((e) => e === audio.src)
		if (playingIdx - 1 >= 0) {
			audio.src = rankArr[playingIdx - 1]
			playingCoverImg.src = rankImgArr[playingIdx - 1]
			playingTitle.innerText = rankTitleArr[playingIdx - 1]
			playingSinger.innerText = rankSingerArr[playingIdx - 1]
			playingCover.classList.remove('paused')
		} else {
			audio.currentTime = 0
		}
	} else {
		let playingIdx = playlistIDArr.findIndex((e) => e === audio.dataset.audioid)
		if (playingIdx - 1 >= 0) {
			audio.src = playlistArr[playingIdx - 1]
			playingCoverImg.src = playlistImgArr[playingIdx - 1]
			playingTitle.innerText = playlistTitleArr[playingIdx - 1]
			playingSinger.innerText = playlistSingerArr[playingIdx - 1]
			audio.dataset.audioid = playlistIDArr[playingIdx - 1]
			playingCover.classList.remove('paused')
		} else {
			audio.currentTime = 0
		}
	}
}

audio.addEventListener('ended', autoNext)
nextBtn.addEventListener('click', autoNext)
prevBtn.addEventListener('click', prevMusic)
