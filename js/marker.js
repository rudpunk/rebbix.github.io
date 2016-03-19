var markers = document.querySelectorAll('.marker__item')
var cards = document.querySelectorAll('.card')
var coords = getCoordinates()

document.addEventListener('DOMContentLoaded', function() {
  arrange()
}, false)

window.onscroll = function() {
  arrange()
}

function arrange() {
  var scrollTop = document.body.scrollTop + window.outerHeight / 2
  var year = getActive(scrollTop)

  if (year) {
    highlightYear(year)
  }
}

function getCoordinates() {
  var coords = []

  for(var i = 0; i < cards.length; i++) {
    var rect = cards[i].querySelector('.card__wrap')
      .getBoundingClientRect()

    coords.push({
      top: rect.top + window.pageYOffset
    , year: cards[i].dataset.year
    , height: rect.height
    })
  }

  return coords
}

function getActive(scrollTop) {
  for (var i = 0; i < coords.length; i++) {
    if (scrollTop >= coords[i].top &&
        scrollTop <= coords[i].top + coords[i].height) {
      return coords[i].year
    }
  }
  return null
}


function highlightYear(year) {
  var passed = []
  var marker;

  for (var i = 0; i < markers.length; i++) {
    marker = markers[i]
    marker.classList.remove('marker__item_passed')
    marker.classList.remove('marker__item_active')
    marker.removeAttribute('style')

    if (marker.innerHTML > year) {
      marker.classList.add('marker__item_passed')
      passed.push(marker)
    } else if (marker.innerHTML == year) {
      marker.classList.add('marker__item_active')
      passed.push(marker)
    }
  }
  for (var i = passed.length, j = 0; i--; j++) {
    passed[i].style.marginTop = -(j*35) + "px"
  }
}
