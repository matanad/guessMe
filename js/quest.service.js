'use strict'

const STORAGE_KEY = 'QuestsTreeDB'

var gQuestsTree
var gCurrQuest
var gPrevQuest = null

function createQuestsTree() {
  const questsTree = loadFromStorage(STORAGE_KEY)
  if (questsTree && questsTree.txt) {
    gQuestsTree = questsTree
    gCurrQuest = gQuestsTree
  } else {
    gQuestsTree = _createQuest('Male?')
    gQuestsTree.yes = _createQuest('Gandhi')
    gQuestsTree.no = _createQuest('Rita')
    gCurrQuest = gQuestsTree
    gPrevQuest = null
  }
  _saveTreeToStorage()
}

function restartGame() {
  _saveTreeToStorage()
  // gQuestsTree
  gCurrQuest = gQuestsTree
  gPrevQuest = null
}

function _saveTreeToStorage() {
  saveToStorage(STORAGE_KEY, gQuestsTree)
}

function _createQuest(txt) {
  return {
    txt: txt,
    yes: null,
    no: null,
  }
}

function isChildless(node) {
  return node.yes === null && node.no === null
}

function moveToNextQuest(res) {
  // DONE: update the gPrevQuest, gCurrQuest global vars
  gPrevQuest = gCurrQuest
  gCurrQuest = gCurrQuest[res]
}

function addGuess(newQuestTxt, newGuessTxt, lastRes) {
  // DONE: Create and Connect the 2 Quests to the quetsions tree
  const newQuest = _createQuest(newQuestTxt)
  newQuest.yes = _createQuest(newGuessTxt)
  newQuest.no = gCurrQuest
  gPrevQuest[lastRes] = newQuest
  _saveTreeToStorage()
}

function getCurrQuest() {
  return gCurrQuest
}
