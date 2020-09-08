import moment from 'moment'
import { getFilters } from './filters'
import { sortNotes, getNotes } from './notes'

const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    if(note.title.length > 0){
        textEl.textContent = note.title
    }else{
        textEl.textContent = 'unnamed note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)
    noteEl.setAttribute('href', `/edit.html#${note.id}`)
    noteEl.classList.add('list-item')
    statusEl.textContent = generateLastEditedMessage(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)
    return noteEl
}

const renderNotes = () =>{
    const notesEl = document.querySelector('#notes')
    const filters = getFilters()
    const notes = sortNotes(filters.sortBy)
    const filterdNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    
    notesEl.innerHTML = ''

    if(filterdNotes.length > 0){
        filterdNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
    
    
}

const initializedEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const bodyElement = document.querySelector('#note-body')
    const dateElement = document.querySelector('#note-updated-at')

    const notes = getNotes()
    const note = notes.find(note => note.id === noteId)


    if(!note){
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEditedMessage(note.updatedAt)

}

const generateLastEditedMessage = timestamp => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEditedMessage, initializedEditPage }