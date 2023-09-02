console.log("Welcome to spotify");

//Initialize the variables
let songIndex = 0;
let audioElement =new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems=Array.from(document.getElementsByClassName("songItem"));


let songs=[
    {songName:"Believer",filePath:"songs/1.mp3",coverPath:"images/1image.jpg"},
    {songName:"one kiss",filePath:"songs/2.mp3",coverPath:"images/2image.jpg"},
    {songName:"Stay",filePath:"songs/3.mp3",coverPath:"images/3image.jpg"},
    {songName:"Animals",filePath:"songs/4.mp3",coverPath:"images/4image.jpg"},
    {songName:"Taki-Taki",filePath:"songs/5.mp3",coverPath:"images/5image.jpg"},
    {songName:"Blinding Lights",filePath:"songs/6.mp3",coverPath:"images/6image.jpg"},
    {songName:"Levitating",filePath:"songs/7.mp3",coverPath:"images/7image.jpg"},
]



songItems.forEach((element,i) => {
 
    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText =songs[i].songName;
});
//audioElement.play();
//Handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        console.log('check')
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        console.log('check2')
        audioElement.pause();
          masterPlay.classList.remove('fa-pause-circle');
          masterPlay.classList.add('fa-play-circle');
         gif.style.opacity=0;
    }
})
//Listen to Events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update Seekbar
    progress= parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        if(audioElement.paused){
            audioElement.src = `songs/${songIndex+1}.mp3`;
            masterSongName.innerText = songs[songIndex].songName;
            audioElement.play();
            audioElement.paused = false;
            audioElement.currentTime=0;
            e.target.classList.remove('fa-play-circle');
            e.target.classList.add('fa-pause-circle');
            masterPlay.classList.remove('fa-play-circle'); 
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity=1;
        }
        else{
            audioElement.pause();
            audioElement.paused = true;
            e.target.classList.remove('fa-pause-circle');
            e.target.classList.add('fa-play-circle');
            masterPlay.classList.remove('fa-pause-circle'); 
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity=0;
        }
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=6){
    songIndex =0
    }
    else{ songIndex +=1;}
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
      songIndex=0;
    }
    else {songIndex -=1;}
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
      audioElement.currentTime=0;
      audioElement.play();
       masterPlay.classList.remove('fa-play-circle');
       masterPlay.classList.add('fa-pause-circle');

})