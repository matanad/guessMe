'use strict'

// NOTE: This is a global used only in the controller
var gLastRes = null

$(document).ready(init)



function init() {
  setListeners()
  $('.game-start').show()
  $('.quest').hide()
  console.log('Started...')
  createQuestsTree()
}

function setListeners() {
  $('.btn-start').click(onStartGuessing)
  $('.btn-yes').click({ ans: 'yes' }, onUserResponse)
  $('.btn-no').click({ ans: 'no' }, onUserResponse)
  $('#newGuess').on('invalid', (function (ev) {
    ev.preventDefault()
    $(this).addClass('is-invalid')
  }))
  $('#newQuest').on('invalid', (function (ev) {
    ev.preventDefault()
    $(this).addClass('is-invalid')
  }))
  $('.btn-add-guess').submit().click(onAddGuess)
}

function onStartGuessing() {
  // DONE: hide the game-start section
  $('.game-start').hide()
  renderQuest()
  // DONE: show the quest section
  $('.quest').show()
}

function renderQuest() {
  // DONE: select the <h2> inside quest and update
  // its text by the currQuest text
  $('.quest h2').text(getCurrQuest().txt)
}

function onUserResponse(ev) {
  console.log('ev', ev.data.ans)
  const res = ev.data.ans
  // If this node has no children
  if (isChildless(getCurrQuest())) {
    if (res === 'yes') {
      // alert('Yes, I knew it!')
      _saveTreeToStorage()
      showWinModal()
    } else {
      // alert('I dont know...teach me!')
      showDontKnowModal()
      // DONE: hide and show new-quest section
      $('.quest').hide()
      $('.new-quest').show()
    }
  } else {
    // DONE: update the lastRes global var
    gLastRes = res
    moveToNextQuest(res)
    renderQuest()
  }
}

function showWinModal() {
  $('.modal h1').text('Yes, I knew it!')
  $('.modal .modal-body').text('Want to play again?')
  $('.modal .ok').off('click')
  $('.modal .ok').on('click', () => {
    hideModal()
    onRestartGame()
  })
  $('.modal').modal("toggle")
}

function showDontKnowModal() {
  $('.modal h1').hide()
  $('.modal .modal-body').html('<h1>I dont know...teach me!</h1>')
  $('.modal .no').hide()
  $('.modal .ok').text('OK!')
  $('.modal .ok').off('click')
  $('.modal .ok').on('click', hideModal)
  $('.modal').modal("toggle")
}

function hideModal() {
  $('.modal').modal("toggle")
}

function onAddGuess(ev) {
  ev.preventDefault()
  console.log(ev);
  var newGuess = $('#newGuess').val()
  var newQuest = $('#newQuest').val()

  // DONE: Get the inputs' values
  // DONE: Call the service addGuess
  addGuess(newQuest, newGuess, gLastRes)

  onRestartGame()
}

function onRestartGame() {
  $('.quest').hide()
  $('.new-quest').hide()
  $('.game-start').show()
  restartGame()
  gLastRes = null
}
