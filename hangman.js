//setting sentence to guess
var sentence = "to hire me";
sentence = sentence.toUpperCase();

var length = sentence.length;
var wrongLetter = 0;

//sound for wrong and correct chosen letter
var yes = new Audio("yes.wav");
var no = new Audio("no.wav");

//covering the sentence with ---- ---- ---- ----
var sentence2 = "";

for (i=0; i<length; i++)
{
	if (sentence.charAt(i)==" ") sentence2 = sentence2 + " ";
	else sentence2 = sentence2 + "-";
}

//displaying covered sentence
function display_sentence()
{
	document.getElementById("sentenceBoard").innerHTML = sentence2;
}

//when load call function start
window.onload = start;

//creating polish letters
var letters = new Array(35);

letters[0] = "A";
letters[1] = "Ą";
letters[2] = "B";
letters[3] = "C";
letters[4] = "Ć";
letters[5] = "D";
letters[6] = "E";
letters[7] = "Ę";
letters[8] = "F";
letters[9] = "G";
letters[10] = "H";
letters[11] = "I";
letters[12] = "J";
letters[13] = "K";
letters[14] = "L";
letters[15] = "Ł";
letters[16] = "M";
letters[17] = "N";
letters[18] = "Ń";
letters[19] = "O";
letters[20] = "Ó";
letters[21] = "P";
letters[22] = "Q";
letters[23] = "R";
letters[24] = "S";
letters[25] = "Ś";
letters[26] = "T";
letters[27] = "U";
letters[28] = "V";
letters[29] = "W";
letters[30] = "X";
letters[31] = "Y";
letters[32] = "Z";
letters[33] = "Ż";
letters[34] = "Ź";



function start()
{
	
	var alphabet_Board ="";
	
	for (i=0; i<=34; i++)
	{
		//adding id to all alphabet elements
		var element = "lett" + i;
		alphabet_Board = alphabet_Board + '<div class="letter" onclick="check('+i+')" id="'+element+'">'+letters[i]+'</div>';
		//display 7 letters in a row (5 rows, 7 columns)
		if ((i+1) % 7 ==0) alphabet_Board = alphabet_Board + '<div style="clear:both;"></div>';
	}
	
	document.getElementById("lettersTab").innerHTML = alphabet_Board;
	
	
	display_sentence();
}

//e.g. Replace the mark at position 3 with B (chaR)
String.prototype.setChar = function(position, chaR)
{
	if (position > this.length - 1) return this.toString();
	else return this.substr(0, position) + chaR + this.substr(position+1);
}


function check(nb)
{
	
	var correctLetter = false;
	
	for(i=0; i<length; i++)
	{
		if (sentence.charAt(i) == letters[nb]) 
		{
			sentence2 = sentence2.setChar(i,letters[nb]);
			correctLetter = true;
		}
	}
	
	if(correctLetter == true)
	{
		yes.play();
		var element = "lett" + nb;
		document.getElementById(element).style.background = "#003300";
		document.getElementById(element).style.color = "#00C000";
		document.getElementById(element).style.border = "3px solid #00C000";
		document.getElementById(element).style.cursor = "default";
		
		display_sentence();
	}
	else
	{
		no.play();
		var element = "lett" + nb;
		document.getElementById(element).style.background = "#330000";
		document.getElementById(element).style.color = "#C00000";
		document.getElementById(element).style.border = "3px solid #C00000";
		document.getElementById(element).style.cursor = "default";	
		document.getElementById(element).setAttribute("onclick",";");		
		
		//incorrect
		wrongLetter++;
		var img = "img/s"+ wrongLetter + ".jpg";
		document.getElementById("hangman").innerHTML = '<img src="'+img+'" alt="" />';
	}
	
	//win case
	if (sentence == sentence2)
	document.getElementById("lettersTab").innerHTML  = "Correct! You guessed the secret sentence: "+sentence+'<br /><br /><span class="reset" onclick="location.reload()">Try Again?</span>';
	
	//lose case
	if (wrongLetter>=9)
	document.getElementById("lettersTab").innerHTML  = "You Lost!"+'<br /><br /><span class="reset" onclick="location.reload()">Try Again?</span>';
}
