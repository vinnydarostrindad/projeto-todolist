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
        this.$addListBtn = document.querySelector('#addListBtn')
        this.$addListContainer = document.querySelector('#addListContainer')
        this.$addListFocus = document.querySelector('#addListFocus')
        this.$html = document.querySelector('html')
        this.$closeCreatListBtn = document.querySelector('#closeCreatList')

        this.$inputListName = document.querySelector('#inputListName')
        this.$listName = document.querySelector('#listName')
        this.$addTaskBtn = document.querySelector('#addTask')
        this.$inputListLine = document.querySelector('#listLine')
        this.$tasksAddedList = document.querySelector('#tasksAdded')
    },
    callEvents: function() {
        this.$addListBtn.onclick = this.Events.openCreatNewList_click.bind(this)
        this.$closeCreatListBtn.onclick = this.Events.closeCreatNewList_click.bind(this)
        this.$inputListName.onclick = this.Events.changeListName_click.bind(this)
        this.$inputListName.onkeypress = this.Events.confirmListName_keypress.bind(this)
        this.$addTaskBtn.onclick = this.Events.addTask_click.bind(this) 
        this.$inputListLine.onkeypress = this.Events.addTask_keypress.bind(this)
    },
    
    Events: {
        openCreatNewList_click: function() {
            this.$addListContainer.classList.add('showAddListContainer')
            this.$addListFocus.classList.add('onScreen')
            this.$html.classList.add('overflow')
        },
        closeCreatNewList_click: function() {
            this.$addListContainer.classList.remove('showAddListContainer')
            this.$addListFocus.classList.remove('onScreen')
            this.$html.classList.remove('overflow')
        },
        changeListName_click: function() {
            let listName = this.$inputListName

            if (listName.value == 'Nome da lista') {
                listName.value = ""
            }
        },
        confirmListName_keypress: function(e) {
            if (e.key == 'Enter') {
                if (this.$inputListName.value != "") {
                    console.log('OK')
                    this.$inputListLine.focus()
                }
            }
        },
        addTask_click: function() {
            let inputTask = this.$inputListLine
            console.dir(this.$tasksAddedList)
            
            if (inputTask.value == '') {
                return
            }

            this.$tasksAddedList.innerHTML += `<li>${inputTask.value} <span>x</span></li>`
            inputTask.value = ""
            console.dir(this.$tasksAddedList)
        },
        addTask_keypress: function(e) {
            if (e.key == 'Enter') { 
                let inputTask = this.$inputListLine
                
                
                if (inputTask.value == '') {
                    return
                } 
                
                this.$tasksAddedList.innerHTML += `<li>${inputTask.value} <span>x</span></li>`
                let tasksArray = []

                for (i = 0; i < this.$tasksAddedList.children.length; i++) {
                    tasksArray.push(this.$tasksAddedList.children[i].firstChild.data)
                    console.log(tasksArray)
                    console.log(tasksArray[i])
                }
                console.log(this.$tasksAddedList.children[0].firstChild.data)
                inputTask.value = ""
                
            }
        }
    }
}

Header.setup()
Nav.setup()
Main.setup()