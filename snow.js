const questions = document.querySelectorAll(".question");
const questionsBegin = document.querySelectorAll(".question.begin");
const questionsTypeA = document.querySelector(".question.typeA");
const questionsTypeB = document.querySelector(".question.typeB");
const questionsTypeC = document.querySelector(".question.typeC");

//all inputs/selects
const inpsA = document.querySelectorAll(".typeAInps")
const inpsB = document.querySelectorAll(".typeBInps")
const inpsC = document.querySelectorAll(".typeCInps")

const otherInps = document.querySelectorAll(".other_inps")

const questionType = document.getElementById("account_type")

const prevBtn = document.getElementById("previous");
const nextBtn = document.getElementById("next");
let current = 0;

window.onload = function(){
	questions[current].style.display = "block";
	prevBtn.style.display = "none";
}
nextBtn.addEventListener("click", function () {
	if(current < questionsBegin.length -1){
		questions[current].style.display = "none";
		current++;
		questions[current].style.display = "block";
	}else if(questionType.value !== ""){
		questions[current].style.display = "none"
		if(questionType.value == "investment"){
			if(this.textContent == "Next"){
				eraseInps(inpsB, inpsC)
				removeDisplay(questionsTypeA, questionsTypeB, questionsTypeC)
			}else{
				if(validate(inpsA) && validateOther(otherInps)){
					document.getElementById("questionnaire-form").submit()
				}else{
					showAlert()
				}
			}
			
		}else if(questionType.value == "savings"){
			if(this.textContent == "Next"){
				eraseInps(inpsA, inpsC)
				removeDisplay(questionsTypeB, questionsTypeA, questionsTypeC)
			}else{
				if(validate(inpsB) && validateOther(otherInps)){
					document.getElementById("questionnaire-form").submit()
				}else{
					showAlert()
				}
			}
		
		}else if(questionType.value == "brokerage"){		
			if(this.textContent == "Next"){
				eraseInps(inpsA, inpsB)
				removeDisplay(questionsTypeC, questionsTypeA, questionsTypeB)
			}else{
				if(validate(inpsC) && validateOther(otherInps)){
					document.getElementById("questionnaire-form").submit()
				}else{
					showAlert()
				}
			}
		}
	}
	if (questionsTypeA.style.display == "block"
	|| questionsTypeB.style.display == "block"
	|| questionsTypeC.style.display == "block"){
		nextBtn.textContent = "Submit";
	}else {
		nextBtn.textContent = "Next";
	}	
	prevBtn.style.display = "inline";
})

prevBtn.addEventListener("click", function () {
	nextBtn.textContent = "Next";
	if(questionType.value == "" && current <= questionsBegin.length -1){
		questions[current].style.display = "none";
		current--
		questions[current].style.display = "block";
	}else if(questionType.value !== "" && questionsTypeA.style.display == "block"){
		questionsTypeA.style.display = "none"
		questions[current].style.display = "block";
	}else if(questionType.value !== "" && questionsTypeB.style.display == "block"){
		questionsTypeB.style.display = "none"
		questions[current].style.display = "block";
	}else if(questionType.value !== "" && questionsTypeC.style.display == "block"){
		questionsTypeC.style.display = "none"
		questions[current].style.display = "block";
	}
	
	else if(questionType.value !== questionsTypeA.style.display !== "block"){
		questions[current].style.display = "none";
		current--
		questions[current].style.display = "block";
	}else if(questionType.value !== questionsTypeB.style.display !== "block"){
		alert("done")
	}else if(questionType.value !== questionsTypeC.style.display !== "block"){
		alert("done")
	}
	
	if (current == 0) {
		prevBtn.style.display = "none";
	}
});

function eraseInps(type1, type2){
	for(quests in type1){
		type1[quests].value = ""
	}
	for(quests in type2){
		type2[quests].value = ""
	}
}
function removeDisplay(elem, elem1, elem2){
	elem.style.display = "block"
	elem1.style.display = "none"
	elem2.style.display = "none"
}
function validate(inps){
	let totalQ = 0
	for(i in inps){
		if(inps[i].value !== ""){
			totalQ++
		}else{
			return false;
		}
		if(totalQ == inps.length){
			return true;
		}
	}
}
function validateOther(otherInps){
	let otherQ = 0
	for(i in otherInps){
		if(otherInps[i].value !== ""){
			otherQ++
		}else{
			return false;
		}
	
		if(otherQ == otherInps.length){
			return true;
		}
	}
}
const alertElem = document.querySelector(".error")

function showAlert(){
	alertElem.style.display = "block"
	setTimeout(function(){
		alertElem.style.display = "none"
	}, 1500)
}
   