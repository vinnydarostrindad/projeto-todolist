let AllLists = []

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
        this.$explainSite = document.querySelectorAll('#explainSite')
        this.$config = document.querySelectorAll('#config')
        this.$allLists = document.querySelectorAll('#lists')
        this.$openCloseList = document.querySelectorAll('#openCloseList')
        this.$arrowNavList = document.querySelectorAll('#arrowNavList')
        this.$navList = document.querySelectorAll('#navList')
        this.$navListCheck = document.querySelectorAll('.checkNavList')
    },
    callEvents: function() {
        const self = this
        
        this.$explainSite.forEach(function(e) {
            e.onclick = self.Events.explainSite_click
        })
        this.$config.forEach(function(e) {
            e.onclick = self.Events.openConfig_click
        })
        this.$openCloseList.forEach(function(e) {
            e.onclick = self.Events.openCloseList_click
        })
    },
    buildNavListHtml: function() {
        let allNavLists = ""

        for (var i = 0; i < AllLists.length; i++) {
            const listHeader = `
                <div id="openCloseList">
                        <img src="src/img/openArrow.svg" alt="abrir" id="arrowNavList">
                        <h3>${AllLists[i].name}</h3>
                </div>
            `

            let bodyLines = ""
            for (var task = 0; task < AllLists[i].tasks.length; task++) {
                bodyLines += `
                <li class="listLines">
                    <div class="checkNavList"></div>
                    <p>${AllLists[i].tasks[task].task}</p>
                </li>
                `
            }

            let listBody = `
            <ul class="navList" id="navList">
                    ${bodyLines}
            </ul>
            `

            allNavLists += `
            <li class="list" id="list">
                ${listHeader}
                ${listBody}
            </li>
            `
        }

        return allNavLists;
    },
    addListAtNav: function() {
            const allNavLists = this.buildNavListHtml()

            Nav.$allLists.forEach(function(e) {
                e.innerHTML = allNavLists
            })

            Nav.navSelectors()
            Nav.callEvents()
    },
    checkTaskAtNav: function() {
            Nav.$navListCheck.forEach(function(e) {
                const listTask = e.nextElementSibling.innerText

                for (let list in AllLists) {
                    for (let task in AllLists[list].tasks) {
                        console.log(AllLists[list].tasks[task].task)
                        console.log(AllLists[list].tasks[task].done)
                        const listDoneValue = AllLists[list].tasks[task].done

                        if(listTask == AllLists[list].tasks[task].task) {
                            if (listDoneValue == true) {
                                e.innerText = '✓'
                                e.nextElementSibling.style.textDecoration = "line-through 2px"
                            } else {
                                e.innerText = ''
                                e.nextElementSibling.style.textDecoration = ""
                            }
                        }
                        console.log(AllLists)
                    }  
                }
            })
    },
    checkCheckedTasksNav: function () {
        
        this.$navList.forEach(lists => {
            const listTasks = lists.children
            for (let i = 0; i < listTasks.length; i++) {
                const listTask = listTasks[i].lastElementChild.innerText
                const listTaskCheckBox = listTasks[i].firstElementChild

                for (let list in AllLists) {
                    for (let task in AllLists[list].tasks) {
                        if (listTask == AllLists[list].tasks[task].task) {
                            if (AllLists[list].tasks[task].done == true) {
                                listTaskCheckBox.innerText = '✓'
                                listTaskCheckBox.nextElementSibling.style.textDecoration = "line-through 2px"
                            }
                        }
                    }  
                }
            }
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
                    const listArrow = e.srcElement.previousElementSibling
                    
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
        this.$listsContainer = document.querySelector('#listsContainer')
        this.$checkbox = document.querySelectorAll('.checkBoxLine')
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
        this.$confirmExitContainer = document.querySelector('#confirmExit')
        this.$confirmExitBtn = document.querySelectorAll('#confirmExitBtn')
        this.$addListBtn = document.querySelector('#addListBtn')
        
    },
    callEvents: function() {
        const self = this

        this.$creatListBtn.onclick = self.Events.openCreatNewList_click.bind(this)
        this.$closeCreatListBtn.onclick = self.Events.closeCreatNewList_click.bind(this)
        this.$confirmExitBtn.forEach(function(e) {
            e.onclick = self.Events.chooseOkCancel_click.bind(self)
        })
        this.$inputListName.onkeypress = self.Events.confirmListName_keypress.bind(this)
        this.$inputListName.onclick = self.Events.correctEmpty_click
        this.$inputListLine.onclick = self.Events.correctEmpty_click
        this.$creatTaskBtn.onclick = self.Events.creatTask_click.bind(this) 
        this.$inputListLine.onkeypress = self.Events.creatTask_keypress.bind(this)
        this.$removeTaskCreated.forEach(function(e) {
            e.onclick = self.Events.removeTaskCreated_click.bind(self)
        })
        this.$addListBtn.onclick = self.Events.addList_click.bind(this)
        this.$checkbox.forEach(function(e) {
            e.onclick = self.Events.checkTask_click
        })
    },
    buildMainListHtml: function() { 
        let list =''

        for (var i = 0; i < AllLists.length; i++) {
            const listHeader = `
                <header class="listHeader">
                    <span class="listCheck"></span>
                    <h3>${AllLists[i].name}</h3>
                    <span class="creatLine">+</span>
                </header>
            `

            let listBody = ''
            for (var task = 0; task < AllLists[i].tasks.length; task++) {
                listBody += `
                    <li>
                        <span class="checkBoxLine">
                            <div class="unchecked"></div>
                        </span>
                        <div>
                            <p>
                            ${AllLists[i].tasks[task].task}
                            </p>
                            <span class="removeLine">x</span>
                        </div>
                    </li>
                `
            }

            list += `
                <li class="containerList">
                    ${listHeader}
                    <ul>
                        ${listBody}
                    </ul>
                </li>
            `
        }
            
        
        return list;
    },
    addLocalStorageList: function () {
        this.$listsContainer.innerHTML = this.buildMainListHtml()

        this.mainSelectors()
        this.callEvents()
    }, 
    checkCheckedTasksMain: function () {
        this.$checkbox.forEach(checkBox => {
            const listTask = checkBox.parentElement.lastElementChild.firstElementChild.innerText

            for (let list in AllLists) {
                for (var i = 0; i < AllLists[list].tasks.length; i++) {
                    if (listTask == AllLists[list].tasks[i].task) {
                        if (AllLists[list].tasks[i].done == true) {
                            checkBox.firstElementChild.classList.add('checked')
                        }
                    }
                }  
            }
            
        })
    },
    Events: {
        openCreatNewList_click: function() {
            this.$creatListContainer.classList.add('showCreatListContainer')
            this.$creatListFocus.classList.add('onScreen')
            this.$html.classList.add('overflow')
            this.$inputListName.focus()
        },
        closeCreatNewList_click: function() {
            if (this.$inputListName.value != "" || this.$inputListLine.value != "" || this.$tasksCreatedList.children.length != 0) {
                this.$confirmExitContainer.classList.add('appearConfirmExitBg')
            } else {
                this.$creatListContainer.classList.remove('showCreatListContainer')
                this.$creatListFocus.classList.remove('onScreen')
                this.$html.classList.remove('overflow')

                this.$inputListName.classList.remove('empty')
                this.$inputListName.placeholder = "Nome da lista"
                this.$inputListLine.classList.remove('empty')
                this.$inputListLine.placeholder = "Adicione uma tarefa"
            }
        },
        chooseOkCancel_click: function(e) {   
            let btnClicked = e.target.value

            if (btnClicked == "OK") {
                this.$creatListContainer.classList.remove('showCreatListContainer')
                this.$creatListFocus.classList.remove('onScreen')
                this.$html.classList.remove('overflow')

                this.$inputListName.value = ""
                this.$inputListLine.value = ""
                let listLength = this.$tasksCreatedList.children.length
                for (var i = 0; i < listLength; i++) {
                    let listLine = this.$tasksCreatedList.children[0]
                    listLine.remove()
                }

                this.$inputListName.classList.remove('empty')
                this.$inputListName.placeholder = "Nome da lista"
                this.$inputListLine.classList.remove('empty')
                this.$inputListLine.placeholder = "Adicione uma tarefa"
            }
            this.$confirmExitContainer.classList.remove('appearConfirmExitBg')
        },
        confirmListName_keypress: function(e) {
            if (e.key == 'Enter') {
                if (this.$inputListName.value != "") {
                    this.$inputListLine.focus()
                    this.$inputListLine.placeholder = 'Adicione uma tarefa'
                    this.$inputListLine.classList.remove('empty')
                }
            }
        },
        creatTask_click: function() {
            let inputTask = this.$inputListLine
                
            if (inputTask.value == '') {
                return
            } else if (this.$tasksCreatedList.children.length != 0) {
                for (let tasks of this.$tasksCreatedList.children) {
                    if (tasks.firstChild.textContent == inputTask.value) {
                        alert('Já adicionado')
                        inputTask.value = ""
                        return
                    }
                } 
            }
            
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
                } else if (this.$tasksCreatedList.children.length != 0) {
                    for (let tasks of this.$tasksCreatedList.children) {
                        if (tasks.firstChild.textContent == inputTask.value) {
                            alert('Já adicionado')
                            inputTask.value = ""
                            return
                        }
                    } 
                }
                
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
            
            removeCreatedLine.remove()
            for (let tasks of this.$tasksCreatedList.children) {
                if (tasks == linetaskremoved) {
                    let positionInArray = this.$tasksCreatedList.children.indexOf(tasks)
                    this.$tasksCreatedList.children.splice(positionInArray, 1)
                }
            }
        },
        addList_click: function() {
            let verification = 1

            if (this.$inputListName.value == "") {
                this.$inputListName.classList.add('empty')
                this.$inputListName.placeholder = "Coloque um nome"
                verification--
            }
            if (this.$tasksCreatedList.children.length == 0) {
                this.$inputListLine.classList.add('empty')
                this.$inputListLine.value = ""
                this.$inputListLine.placeholder = "Adicione 1 tarefa no mínimo"
                verification--
            } 

            if (verification == 1) {
                this.$creatListContainer.classList.remove('showCreatListContainer')
                this.$creatListFocus.classList.remove('onScreen')
                this.$html.classList.remove('overflow')

                let listTasks = []
                for (let task of this.$tasksCreatedList.children) {
                    const taskConfig = {task: task.firstElementChild.innerText, done: false}
                    listTasks.push(taskConfig)
                }
                AllLists.push({name: this.$inputListName.value, tasks: 
                listTasks})

                LocalStorage.saveLists()
                
                this.$listsContainer.innerHTML = this.buildMainListHtml()

                Nav.addListAtNav()

                this.$inputListName.value = ""
                this.$inputListLine.value = ""
                let listLength = this.$tasksCreatedList.children.length
                for (var i = 0; i < listLength; i++) {
                    let listLine = this.$tasksCreatedList.children[0]
                    listLine.remove()
                }                  
            }

            this.mainSelectors()
            this.callEvents()
        },
        correctEmpty_click: function(e) {
            let inputIdentifier = e.target.id

            e.target.classList.remove('empty')
            if (inputIdentifier == 'inputListName') {
                e.target.placeholder = "Nome da lista"
            } else {
                e.target.placeholder = "Adicione uma tarefa"
                e.target.style.color = ''
            }
        },
        checkTask_click: function(e) {
            let checkBoxClassList = e.target.firstElementChild.classList
            let taskClicked = e.target.nextElementSibling.firstElementChild.innerText

            checkBoxClassList.toggle('checked')

            for (var list in AllLists) {
                for (var task in AllLists[list].tasks) {
                    if (taskClicked == AllLists[list].tasks[task].task) {
                        if (checkBoxClassList.contains('checked')) {
                            AllLists[list].tasks[task].done = true
                        } else {
                            AllLists[list].tasks[task].done = false
                        }
                    }
                }
            }

            LocalStorage.saveLists()

            Nav.checkTaskAtNav()
        }
    }
}

const LocalStorage = {
    backupLists: function() {
        AllLists = JSON.parse(localStorage.getItem('lists'))

        if (AllLists) {
            Main.addLocalStorageList()
            Main.checkCheckedTasksMain()
            Nav.addListAtNav()
            Nav.checkCheckedTasksNav()
        } else {
            localStorage.setItem('lists', JSON.stringify([]))
        }
    },
    saveLists: function() {
        localStorage.setItem('lists' ,JSON.stringify(AllLists))
    }
}

Header.setup()
Nav.setup()
Main.setup()
LocalStorage.backupLists()