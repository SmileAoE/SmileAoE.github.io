
// Sliders functions
// Indexes
let elements = { "app"		: {"class" : "app"		, "index": 0, "dot": document.getElementsByClassName("appDot")		, "timeout": 0}
			   , "stepOne"	: {"class" : "stepOne"	, "index": 0, "dot": document.getElementsByClassName("stepOneDot")	, "timeout": 0}
			   , "stepTwo"	: {"class" : "stepTwo"	, "index": 0, "dot": document.getElementsByClassName("stepTwoDot")	, "timeout": 0}
			   , "stepThree": {"class" : "stepThree", "index": 0, "dot": document.getElementsByClassName("stepThreeDot"), "timeout": 0}}

// Sliding timeout
let slideTime = 5000;

// Start auto slide show
autoSlideShow(elements["app"], slideTime);
// autoSlideShow(elements["stepOne"], slideTime);
// autoSlideShow(elements["stepTwo"], slideTime);
// autoSlideShow(elements["stepThree"], slideTime);

function showStepsSlide(slideClassName) {
	let container = document.getElementsByClassName(slideClassName);
	if (container[0].style.display == 'block') {
		switch(slideClassName) {
			case 'slideShowstepOne':
				openAutoHotkey();
				break;
			case 'slideShowstepTwo':
				saveAppScript();
				break;
		}
		return;
	}
	container[0].style.display = "block";
	slideClassName = slideClassName.replace("slideShow", "");
	autoSlideShow(elements[slideClassName], slideTime);
}

function openAutoHotkey() {
    window.open("https://www.autohotkey.com", '_blank').focus();
}

function saveAppScript() {
    saveFile("https://raw.githubusercontent.com/SmileAoE/aoeii_aio/main/Installer.ahk");
}

function saveFile(url) {
    // Get file name from url.
    var filename = "AoE II Manager AIO Installer.ahk";
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function () {
        var a = document.createElement('a');
        a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
        a.download = filename; // Set the file name.
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        delete a;
    };
    xhr.open('GET', url);
    xhr.send();
}

// Get the app version
let url = 'https://raw.githubusercontent.com/SmileAoE/aoeii_aio/main/SharedLib.ahk';
let rawText = '';

fetch(url).then(function(response) {
	response.text().then(function(text) {
		rawText = text;
		getVersion();
	});
});

function getVersion() {
	const versionText = rawText.match(/Version := '(\d.\d)'/g)[0].match(/[+-]?\d+(\.\d+)?/g)[0];
	document.getElementsByClassName('title')[0].textContent = "AoE II Easy Manager v" + versionText;
}

// Auto slide show of specific elements
function autoSlideShow(element) {
	let i;
	let slides = document.getElementsByClassName(element["class"]);
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	element["index"]++;
	if (element["index"] > slides.length) {
		element["index"] = 1
	}
	slides[element["index"]-1].style.display = "block";
	updateDots(element["dot"], element["index"])
	element["timeout"] = setTimeout(autoSlideShow, slideTime, elements[element["class"]]);
}

// Slide show of specific elements
function slideShow(n, element) {
	let i;
	let slides = document.getElementsByClassName(element["class"]);
	if (n > slides.length) {
		element["index"] = 1
	}
	if (n < 1) {
		element["index"] = slides.length
	}
	for (i = 0; i < slides.length; i++) {
		slides[i].style.display = "none";
	}
	slides[element["index"]-1].style.display = "block";
	updateDots(element["dot"], element["index"])
}

// Update dots or circles index below the image
function updateDots(dots, index) {
	for (i = 0; i < dots.length; i++) {
		dots[i].className = dots[i].className.replace(" active", "");
	}
	dots[index-1].className += " active";
}

// Move to the next/previous slide
function oneplusSlides(n, className) {
	let element = elements[className];
	slideShow(element["index"] += n, element);
	clearTimeout(element["timeout"]);
	element["timeout"] = setTimeout(autoSlideShow, slideTime, elements[element["class"]]);
}

// Move to specific slide
function currentSlide(n, className) {
	let element = elements[className];
	slideShow(element["index"] = n, element);
	clearTimeout(element["timeout"])
	element["timeout"] = setTimeout(autoSlideShow, slideTime, elements[element["class"]]);
}