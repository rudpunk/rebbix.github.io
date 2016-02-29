
var coords = getCoordinates();
var years = document.querySelectorAll('.marker > .marker__list > li');


document.addEventListener('DOMContentLoaded', function() {
  highlightActiveYear();
}, false);

window.onscroll = function () {
  highlightActiveYear();
}

function highlightActiveYear () {
  var YPosition =  window.pageYOffset + window.outerHeight/2;
  var highlightedPosition = getActive(YPosition);

  if(highlightedPosition) {
    removeHighlight(highlightedPosition);
    highlightYear(highlightedPosition);
  }
}

function getCoordinates() {
  var items = document.querySelectorAll('.container > .container__item');
  var years = document.querySelectorAll('.container > .container__item > div.footer');
  var coords = [];
  for(var i=0; i<items.length; i++) {
    var year = (years[i].innerHTML).replace(/[^0-9]/g, '');
    coords.push({top:items[i].getBoundingClientRect().top + window.pageYOffset, height:items[i].getBoundingClientRect().height, year:year});
  }
  return coords;
}

function getActive(YPosition) {
  for(var i=0; i<coords.length; i++) {
    if(YPosition >= coords[i].top && YPosition <= coords[i].top + coords[i].height) {
      return coords[i].year;
    }
  }
  return null;
}

function highlightYear(year) {
  for(var i=0; i<years.length; i++) {
    if(years[i].innerHTML > year) {
      years[i].setAttribute('class', 'passed');
      years[i].style.marginTop = (i+1)*20 + "px";
    }
    else if(years[i].innerHTML < year && years[i].hasAttribute('class', 'passed')) {
       years[i].removeAttribute('class', 'passed');
       years[i].removeAttribute('style');
    }

    else if(years[i].innerHTML == year) {
      years[i].setAttribute('class' , 'active');
      years[i].removeAttribute('style');
    }
  }
}

function removeHighlight(year) {
   for(var i=0; i<years.length; i++) {
    if(years[i].hasAttribute('class', 'active') && years[i].innerHTML > year) {
      years[i].removeAttribute('class' , 'active');

    }
    else if(years[i].hasAttribute('class', 'active') && years[i].innerHTML < year) {
       years[i].removeAttribute('class' , 'active');
       years[i].setAttribute('class' , 'passed');
       years[i].style.marginTop = (i+1)*20 + "px";
    }
  }
}
