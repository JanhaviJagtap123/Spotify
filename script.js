console.log("Welcome to spotify");
// Initailize the variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let marsterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongPlay = document.getElementById("masterSongPlay")
let songItem = Array.from(document.getElementsByClassName("songItem"));

let songArr = [
    {songName:"Bol Na Halke Halke", filePath:"songs/1.mp3"},
    {songName:"Husn", filePath:"songs/2.mp3"},
    {songName:"Kahani Suno", filePath:"songs/3.mp3"},
    {songName:"Pehle Bhi Main", filePath:"songs/4.mp3"},
    {songName:"O Mahi O Mahi", filePath:"songs/5.mp3"},
    {songName:"Phir Aur Kya Chahiye", filePath:"songs/6.mp3"},
    {songName:"Satranga", filePath:"songs/7.mp3"},
    {songName:"Saudebaazi", filePath:"songs/8.mp3"},
    {songName:"Tere Hawaale", filePath:"songs/9.mp3"},
    {songName:"Ve Kamleya", filePath:"songs/10.mp3"},
]

songItem.forEach((element,i) => {
    element.getElementsByClassName("songName")[0].innerText = songArr[i].songName;
});

// handle play/pause click
marsterPlay.addEventListener("click",()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        marsterPlay.classList.remove("fa-circle-play");
        marsterPlay.classList.add("fa-circle-pause");
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        marsterPlay.classList.remove("fa-circle-pause");
        marsterPlay.classList.add("fa-circle-play");
        gif.style.opacity = 0;
    }
})
// Listen to events
audioElement.addEventListener("timeupdate",()=>{
    console.log("Time update");
    // update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener("change" , () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration /100;

})

const makeAllPlays = () =>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove("fa-circle-pause");
        element.classList.add("fa-circle-play");
    })
}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener("click",(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        console.log(e.target);
        e.target.classList.remove("fa-circle-play");
        e.target.classList.add("fa-circle-pause");
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongPlay.innerText = songArr[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        marsterPlay.classList.remove("fa-circle-play");
        marsterPlay.classList.add("fa-circle-pause");
    })
})

document.getElementById("next").addEventListener("click", ()=>{
    if (songIndex>=9) {
        songIndex=0;
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongPlay.innerText = songArr[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    marsterPlay.classList.remove("fa-circle-play");
    marsterPlay.classList.add("fa-circle-pause");
})

document.getElementById("previous").addEventListener("click", ()=>{
    if (songIndex<=0) {
        songIndex=0;
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongPlay.innerText = songArr[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    marsterPlay.classList.remove("fa-circle-play");
    marsterPlay.classList.add("fa-circle-pause");
})