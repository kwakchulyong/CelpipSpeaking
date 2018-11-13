
	var objQuestion = setQuestion(); //questions
	
	function onload() {
		setupPage(taskNumber);
	}

	var taskNumber = 0;//basic
    var cnt = 0;
	var myVar;
	var countType = 'P';//P:Preparation, R:Recording
	var globalPSec = 0;
	var globalRSec = 0;
	var specialTask5 = 0; //0:Selecting, 1:Preparation, Recording
	var globalSelectImg = ""; //for Task5

	function setupPage(task) {	
		globalPSec = Number(objQuestion.QUESTION[task].PSEC);
		globalRSec = Number(objQuestion.QUESTION[task].RSEC);

		document.getElementById("questionTitle").innerText =  objQuestion.QUESTION[task].QUESTIONTITLE;
		document.getElementById("questionContent").innerText = objQuestion.QUESTION[task].QUESTIONCONTENT;
		document.getElementById("prepareTime").innerText =  globalPSec;
		document.getElementById("recordingTime").innerText =  globalRSec;

		if(task == 3 || task == 4) { 
			document.getElementById("pictureArea").style.display = "block";
			document.getElementById("pictureImg").src = objQuestion.QUESTION[task].IMG;
			document.getElementById("pictureImg").style.width = "400px";
		} else if(task == 5) { 
			document.getElementById("pictureArea").style.display = "block";
			document.getElementById("pictureImg").src = objQuestion.QUESTION[task].IMG;
			document.getElementById("pictureImg").style.width = "300px";
			document.getElementById("pictureImgCaption").innerHTML = objQuestion.QUESTION[task].IMGCAPTION;
			document.getElementById("pictureImg2Fig").style.display = "block";
			document.getElementById("pictureImg2").src = objQuestion.QUESTION[task].IMG2;
			document.getElementById("pictureImg2").style.width = "300px";
			document.getElementById("pictureImg2Caption").innerHTML = objQuestion.QUESTION[task].IMG2CAPTION;
			
		} else if(task == 6 || task == 7) { 
			document.getElementById("questionContentExtra").innerHTML =  objQuestion.QUESTION[task].QUESTIONCONTENTEXTRA;
		} else if(task == 8) { 
			document.getElementById("pictureArea").style.display = "block";
			document.getElementById("pictureImg").src = objQuestion.QUESTION[task].IMG;
			document.getElementById("pictureImg").style.width = "400px";
			
		}
		
		run();

	}
	
	function specialCaseTask5() {
		specialTask5 = 1;
		globalPSec = 60;
		globalRSec = 60;
		
		document.getElementById("questionContent").innerText = objQuestion.QUESTION[taskNumber].SPECIALCONTENT;
		document.getElementById("prepareTime").innerText =  globalPSec;
		document.getElementById("recordingTime").innerText =  globalRSec;
		
		if(globalSelectImg == '') {
			var rSelect = Math.floor((Math.random() * 2) + 1);
			if(rSelect == 1) {
				globalSelectImg = 'pictureImgFig';

			} else if(rSelect == 2) {
				globalSelectImg = 'pictureImg2Fig';
			}
			document.getElementById(globalSelectImg).style.backgroundColor = "#cddcf4";
		}
		
		if(globalSelectImg == 'pictureImgFig'){
			document.getElementById("pictureImg2").src = objQuestion.QUESTION[taskNumber].IMG3;
			document.getElementById("pictureImg2Caption").innerHTML = objQuestion.QUESTION[taskNumber].IMG3CAPTION;
		} else if(globalSelectImg == 'pictureImg2Fig') {
			document.getElementById("pictureImg").src = objQuestion.QUESTION[taskNumber].IMG3;
			document.getElementById("pictureImgCaption").innerHTML = objQuestion.QUESTION[taskNumber].IMG3CAPTION;
		}
		
		
	}
	
	function selectPicture(id) {
		if(taskNumber == 5 && specialTask5 == 0) {
			globalSelectImg = id;
			if(id == 'pictureImgFig'){
				document.getElementById('pictureImgFig').style.backgroundColor = "#cddcf4";
				document.getElementById('pictureImg2Fig').style.backgroundColor = "#FFFFFF";
			} else if(id == 'pictureImg2Fig') {
				document.getElementById('pictureImgFig').style.backgroundColor = "#FFFFFF";
				document.getElementById('pictureImg2Fig').style.backgroundColor = "#cddcf4";
			}
			
		}
		
	}
	
	
	function next() {
		reset();
		if(taskNumber < 8) {
			taskNumber++;	
			setupPage(taskNumber);
		} else {
			if (confirm("Will you try again?")) {
				taskNumber = 0;
				setupPage(taskNumber);
			} else {
				alert("Finish");
				self.close();
			}
		}
	}
	
	function reset() {
		cnt = 0;
		countType = 'P';
		globalPSec = 0;
		globalRSec = 0;
		document.getElementById("questionTitle").innerText =  "";
		document.getElementById("questionContent").innerText = "";			
		document.getElementById("prepareTime").innerText =  0;
		document.getElementById("recordingTime").innerText =  0;
		document.getElementById("progressBar").style.display = "none";
		document.getElementById("questionContentExtra").innerHTML = "";
		document.getElementById("pictureArea").style.display = "none";
		document.getElementById("cntName").innerHTML = "";
		document.getElementById("cntNumber").innerHTML = "";
		document.getElementById("cntNumber").style.display = "block";
		document.getElementById("pictureImg").src = "";
		document.getElementById("pictureImg").style.width = "300px";
		document.getElementById("pictureImgCaption").innerText = "";
		document.getElementById("pictureImg2").src = "";
		document.getElementById("pictureImg2").style.width = "300px";
		document.getElementById("pictureImg2Caption").innerText = "";
		document.getElementById("pictureImg2Fig").style.display = "none";
		document.getElementById("pictureImgFig").style.backgroundColor = "#FFFFFF";
		document.getElementById("pictureImg2Fig").style.backgroundColor = "#FFFFFF";
		globalSelectImg = "";
		clearInterval(myVar);
	}
	

	

	function run() {
		document.getElementById("cntName").innerText = "Preparation Time";
		cnt = globalPSec;
		var view=document.getElementById("cntNumber");
		view.innerText = cnt;
		
		myVar = setInterval("countdown()", 1000);
	}
	
	function countdown() {
		var view=document.getElementById("cntNumber");

		if(cnt > 0) {
			cnt--;
			if(countType == 'P') {
				view.innerText = cnt;
			} else if(countType == 'R') {
				changeProgressBar(cnt);
			}
			
		} else {
			if(countType == 'P') {
				if(taskNumber == 5 && specialTask5 ==0) {
					specialCaseTask5();
					cnt = globalRSec+1;
				} else {
					document.getElementById("cntNumber").style.display = "none";
					document.getElementById("progressBar").style.display = "block";
					countType = 'R';
					document.getElementById("cntName").innerText = "Recording";
					cnt = globalRSec+1;
					playVoice('StartSpeakingNow');
				}
			} else if(countType == 'R') {
				clearInterval(myVar);
				specialTask5 = 0;
				playVoice('TimeIsUp');
			}
			
		}
		
	}
	
	function changeProgressBar(cnt) {
		//globalRSec
		if(globalRSec > 0) {
			var progress = globalRSec - cnt; //ex, 60:60 = 0%
			var percent = Math.round(progress / globalRSec  * 100);	
			document.getElementById("progressBar").value = percent;
		}
	}
	
	function playVoice(fileName) {
		var audio = new Audio("mp3/"+fileName+'.mp3');
		audio.play();
	}
	