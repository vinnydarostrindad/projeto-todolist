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
            console.log(e)
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
                console.log(dadElement.nextSibling.nextSibling)
                const toggleList = dadElement.nextSibling.nextSibling
                toggleList.classList.toggle('openCloseNavList')
            } else if (elementClicked == 'DIV') {
                console.log('OK Ease')
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

    },
    callEvents: function() {

    },
    
    Events: {
       
    }
}

Header.setup()
Nav.setup()
Main.setup()