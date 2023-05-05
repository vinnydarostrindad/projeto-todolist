const Header = {
    setup: function() {
        this.headerSelectors()
        this.callEvents()
    },
    headerSelectors: function() {
        this.$navButton = document.querySelector('#navButton')
        this.$nav = document.querySelector('#nav')
        this.$closeNav = document.querySelector('#closeNav')
        this.$html = document.querySelector('html')
    },
    callEvents: function() {
        this.$navButton.onclick = this.Events.openNav_click.bind(this)
        this.$closeNav.onclick = this.Events.closeNav_click.bind(this)
    },

    Events: {
        openNav_click: function() {
            const self = this

            this.$html.classList.add('overflow')
            this.$nav.classList.remove('display')
            this.$closeNav.classList.add('visibility')
            this.$closeNav.classList.add('onScreen')

            setTimeout(function() {
                self.$nav.classList.add('opened')
            }, 1)
            
        },
        closeNav_click: function() {
            const self = this

            this.$html.classList.remove('overflow')
            this.$nav.classList.remove('opened')
            this.$closeNav.classList.remove('onScreen')

            setTimeout(function() {
                self.$closeNav.classList.remove('visibility')
                self.$nav.classList.add('display')
            }, 200)
        }
    }
}

const Nav = {
    setup:  function() {
        this.navSelectors()
        this.callEvents()
    },
    navSelectors: function() {
        this.$explainSite = document.querySelector('#explainSite')
        this.$config = document.querySelector('#config')
        this.$openCloseList = document.querySelectorAll('#openCloseList')
        this.$arrowNavList = document.querySelectorAll('#arrowNavList')
        this.$navList = document.querySelectorAll('#navList')
    },
    callEvents: function() {
        const self = this
        
        this.$explainSite.onclick = this.Events.explainSite_click
        this.$config.onclick = this.Events.openConfig_click

        this.$openCloseList.forEach(function(e) {
            e.onclick = self.Events.openCloseList_click
        })
    },
    
    Events: {
        explainSite_click: function() {
            alert('Faz listas')
        },
        openConfig_click: function() {
            alert('Fora de funcionamento')
        },
        openCloseList_click: function(e) {
            let elementClicked = e.target.tagName

            if (elementClicked == 'IMG' || elementClicked == 'H3') {
                const dadElement = e.srcElement.parentElement
                const toggleList = dadElement.nextSibling.nextSibling
                
                toggleList.classList.toggle('openCloseNavList')

                if (elementClicked == 'H3') {
                    const listArrow = e.srcElement.previousSibling
                    
                    listArrow.classList.toggle('openCloseNavListBtn')
                } else {
                    e.srcElement.classList.toggle('openCloseNavListBtn')
                }
            } else if (elementClicked == 'DIV') {
                const toggleList = e.srcElement.nextSibling.nextSibling
                const listArrow = e.srcElement.children[0]

                toggleList.classList.toggle('openCloseNavList')
                listArrow.classList.toggle('openCloseNavListBtn')
            }
        }
    }
}

const Main = {
    setup:  function() {
        this.mainSelectors()
        this.callEvents()
    },
    mainSelectors: function() {
        this.$creatListBtn = document.querySelector('#creatListBtn')
        this.$creatListContainer = document.querySelector('#creatListContainer')
        this.$creatListFocus = document.querySelector('#creatListFocus')
        this.$html = document.querySelector('html')
        this.$closeCreatListBtn = document.querySelector('#closeCreatList')

        this.$inputListName = document.querySelector('#inputListName')
        this.$listName = document.querySelector('#listName')
        this.$creatTaskBtn = document.querySelector('#creatTask')
        this.$inputListLine = document.querySelector('#listLine')
        this.$tasksCreatedList = document.querySelector('#tasksCreated')
        this.$removeTaskCreated = document.querySelectorAll('#removeTaskCreatedBtn')
    },
    callEvents: function() {
        const self = this

        this.$creatListBtn.onclick = self.Events.openCreatNewList_click.bind(this)
        this.$closeCreatListBtn.onclick = self.Events.closeCreatNewList_click.bind(this)
        this.$inputListName.onkeypress = self.Events.confirmListName_keypress.bind(this)
        this.$creatTaskBtn.onclick = self.Events.creatTask_click.bind(this) 
        this.$inputListLine.onkeypress = self.Events.creatTask_keypress.bind(this)
        this.$removeTaskCreated.forEach(function(e) {
            e.onclick = self.Events.removeTaskCreated_click.bind(self)
        })
    },

    globalVars: {
        taskArray: [],
    },
    Events: {
        openCreatNewList_click: function() {
            this.$creatListContainer.classList.add('showCreatListContainer')
            this.$creatListFocus.classList.add('onScreen')
            this.$html.classList.add('overflow')
            this.$inputListName.focus()
        },
        closeCreatNewList_click: function() {
            this.$creatListContainer.classList.remove('showCreatListContainer')
            this.$creatListFocus.classList.remove('onScreen')
            this.$html.classList.remove('overflow')
        },
        confirmListName_keypress: function(e) {
            if (e.key == 'Enter') {
                if (this.$inputListName.value != "") {
                    this.$inputListLine.focus()
                }
            }
        },
        creatTask_click: function() {
            let inputTask = this.$inputListLine
                
                if (inputTask.value == '') {
                    return
                } else if (this.globalVars.taskArray.length != 0) {
                    for (let tasks of this.globalVars.taskArray) {
                            if (tasks == inputTask.value) {
                                    alert('Já adicionado')
                            inputTask.value = ""
                            return
                        }
                    } 
                }

                this.globalVars.taskArray.push(inputTask.value)
                
                this.$tasksCreatedList.innerHTML += `<li><span>${inputTask.value}</span> <span id='removeTaskCreatedBtn'>x</span></li>`

                inputTask.value = ""
                this.$inputListLine.focus()
                this.mainSelectors()
                this.callEvents()
        },
        creatTask_keypress: function(e) {
            if (e.key == 'Enter') { 
                let inputTask = this.$inputListLine
                
                if (inputTask.value == '') {
                    return
                } else if (this.globalVars.taskArray.length != 0) {
                    for (let tasks of this.globalVars.taskArray) {
                            if (tasks == inputTask.value) {
                                    alert('Já adicionado')
                            inputTask.value = ""
                            return
                        }
                    } 
                }

                this.globalVars.taskArray.push(inputTask.value)
                
                this.$tasksCreatedList.innerHTML += `<li><span>${inputTask.value}</span> <span id='removeTaskCreatedBtn'>x</span></li>`

                inputTask.value = ""
                this.$inputListLine.focus()
                this.mainSelectors()
                this.callEvents()
            }
        },
        removeTaskCreated_click: function(e) {
            let removeCreatedLine = e.target.parentElement
            let linetaskremoved = e.target.parentElement.firstChild.textContent
            
            removeCreatedLine.classList.add('remove')
            for (let tasks of this.globalVars.taskArray) {
                if (tasks == linetaskremoved) {
                    let positionInArray = this.globalVars.taskArray.indexOf(tasks)
                    this.globalVars.taskArray.splice(positionInArray, 1)
                }
            }
        },
    }
}

Header.setup()
Nav.setup()
Main.setup()