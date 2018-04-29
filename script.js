var slide = document.querySelector("#slide");
var index = 0;
var teams = [
    {
        name: "Đội 1",
        score:0,
    },
    {
        name: "Đội 2",
        score:0,
    },
    {
        name: "Đội 3",
        score:0,
    },
    {
        name: "Đội 4",
        score:0,
    }
];
function ScoreShow(){
    var score = document.getElementById("team1score");
    score.style.width = (teams[0].score*200/data.length) +"px";
    score = document.getElementById("team2score");
    score.style.width = (teams[1].score*200/data.length) +"px";
    score = document.getElementById("team3score");
    score.style.width = (teams[2].score*200/data.length) +"px";
    score = document.getElementById("team4score");
    score.style.width = (teams[3].score*200/data.length) +"px";
}
function NewQuestion(n){
    var QAbox = document.createElement("div");
    var left = 100;
    QAbox.className = "QA-box";
    QAbox.style.left = left + "%";
    QAbox.innerHTML = '<p class="question"> '+ data[n].question +' </p> <div class="answer"> <a> <span>A</span> <p>'+ data[n].answers[0] +'</p> </a> <a> <span>B</span> <p>'+ data[n].answers[1] +'</p> </a> <a> <span>C</span> <p>'+ data[n].answers[2] +'</p> </a> <a> <span>D</span> <p>'+ data[n].answers[3] +'</p> </a> </div> <div class="choice"> <div> <span>1</span> <form> <label class="container">A <input type="radio" name="radio" class="team1answer" value="0"> <span class="checkmark"></span> </label> <label class="container">B <input class="team1answer" value="1" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">C <input class="team1answer" value="2" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">D <input class="team1answer" value="3" type="radio" name="radio"> <span class="checkmark"></span> </label> </form> </div> <div> <span>2</span> <form> <label class="container">A <input class="team2answer" value="0" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">B <input class="team2answer" value="1" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">C <input class="team2answer" value="2" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">D <input class="team2answer" value="3" type="radio" name="radio"> <span class="checkmark"></span> </label> </form> </div> <div> <span>3</span> <form> <label class="container">A <input class="team3answer" value="0" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">B <input class="team3answer" value="1" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">C <input class="team3answer" value="2" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">D <input class="team3answer" value="3" type="radio" name="radio"> <span class="checkmark"></span> </label> </form> </div> <div> <span>4</span> <form> <label class="container">A <input class="team4answer" value="0" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">B <input class="team4answer" value="1" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">C <input class="team4answer" value="2" type="radio" name="radio"> <span class="checkmark"></span> </label> <label class="container">D <input class="team4answer" value="3" type="radio" name="radio"> <span class="checkmark"></span> </label> </form> </div> </div>';
    var slide = document.getElementById("slide");
    slide.removeChild(slide.children[0]);
    slide.appendChild(QAbox);
    var interval = setInterval(frame,20);
    function frame(){
        if(left===0){
            clearInterval(interval);
        }else{
            left-=10;
            QAbox.style.left = left + "%";
        }
    }
}
function StartGame(){
    var slide_number = document.getElementById("slide-number");
    for(var i=0;i<data.length;i++){
        var new_number = document.createElement("a");
        new_number.textContent = (i+1);
        slide_number.appendChild(new_number)
    }
    slide_number.firstElementChild.className = "active";
    var btn = document.getElementById("answer-button");
    btn.className = "";
    
    
    NewQuestion(0);
}
function goToNextSlide(){
    var btn = document.getElementById("next-button");
    if(btn.getAttribute("class") !== 'btnDisabled'){
        if(++index<data.length){
            NewQuestion(index);
            btn.className="btnDisabled";
            btn = document.getElementById("answer-button");
            btn.setAttribute("class","");
            var slide_number = document.getElementById("slide-number").children;
            slide_number[index-1].className = "";
            slide_number[index].className = "active";
        }
        else{
            teams.sort(function(a,b){return b.score - a.score;});
            var slide = document.getElementById("slide");
            var result = document.createElement("div");
            result.id = "result";
            var text = teams[0].name;
            index = 1;
            while((index<4)&&(teams[index].score==teams[0].score)){
                text += (" + " + teams[index].name);
                index++;
            }
            result.innerHTML='<div id="winner"><img src="crown.png"/><span>'+ text +'</span><p>'+teams[0].score+'/'+data.length+'</p></div>';
            while(index<4){
                result.innerHTML+='<div class="lost"><span>'+teams[index].name+'</span><p>'+teams[index].score+'/'+data.length+'</p></div>';
                index++;
            }
            slide.removeChild(slide.firstElementChild);
            slide.appendChild(result);
        }
    }
}
function CheckAnswer(){
    var btn = document.getElementById("answer-button");
    if(btn.getAttribute("class") !== 'btnDisabled'){
        btn.className="btnDisabled";
        var btn1 = document.getElementById("next-button");
        btn1.setAttribute("class","");
        for(var i = 0; i < 4; i++){
            var answer = document.querySelector("input.team"+(i+1)+"answer:checked");
            if(answer.value==data[index].correct){
                teams[i].score++;
            }
        }
        ScoreShow();
    }
}