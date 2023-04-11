const Header = {
    setup: function() {
        this.headerSelectors()
        this.callEvents()
    },
    headerSelectors: function() {
        this.$navButton = document.querySelector('#navButton')
        this.$nav = document.querySelector('#nav')
        this.$closeNav = document.querySelector('#closeNav')
    },
    callEvents: function() {
        this.$navButton.onclick = this.Events.openNav_click.bind(this)
        this.$closeNav.onclick = this.Events.closeNav_click.bind(this)
    },

    Events: {
        openNav_click: function() {
            const self = this

            this.$nav.classList.remove('display')
            this.$closeNav.classList.add('visibility')
            this.$closeNav.classList.add('onScreen')

            setTimeout(function() {
                self.$nav.classList.add('opened')
            }, 1)
            
        },
        closeNav_click: function() {
            const self = this

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
        this.$openCloeseList = document.querySelector('#openCloeseList')
        this.$arrowNavList = document.querySelector('#arrowNavList')
        this.$navList = document.querySelector('#navList')
    },
    callEvents: function() {
        this.$explainSite.onclick = this.Events.explainSite_click
        this.$config.onclick = this.Events.openConfig_click
        this.$openCloeseList.onclick = this.Events.openCloseList_click.bind(this)
    },
    
    Events: {
        explainSite_click: function() {
            alert('Faz listas')
        },
        openConfig_click: function() {
            alert('Fora de funcionamento')
        },
        openCloseList_click: function() {
            this.$arrowNavList.style = 'transform: rotate(90deg)'
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