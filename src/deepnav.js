export default class deepnav {
	constructor(id, options) {
		this.id = id 	//Reference to user-passed id of navigation
		this.resizeId 	//Timeout for calling resize (used in init())

		//Merge options into default settings
		let initSettings = {
			hoverMode: false,
			alignSubmenus: "center",
			showContentArrows: true,
			showDefaultAnimations: true,
			showAestheticStyling: true,
			displayMode: "responsive",
			breakpoint: 500
		}

		this.settings = {...initSettings, ...options}
		this.originalHoverMode = this.settings.hoverMode //Track the hoverMode set on construction

		//Initialize DeepNav
		this.init()
	}

	//Bind event listeners
	bindEvents() {
		//Click and hover listeners
		for(let i=0; i < this.topLevels.length; i++) {
			this.topLevels[i].addEventListener('mouseenter', this.hoverTopLevel.bind(this))
			this.topLevels[i].addEventListener('click', this.toggleShown.bind(this))
		}

		for(let i=0; i < this.subLevels.length; i++) {
			this.subLevels[i].addEventListener('mouseenter', this.hoverSubLevel.bind(this))
			this.subLevels[i].addEventListener('click', this.toggleShown.bind(this))
		}

		this.navRoot.addEventListener('mouseleave', this.unhover.bind(this))	//Unhover on mouseleave
			
		//Handle click on body (outside of menu)
		document.addEventListener('click', this.closeAll.bind(this))
		this.navRoot.addEventListener('click', function(e){ e.stopPropagation() })
	}

	resizeScreen() {
		//Show sublinks (to calc actual widths)
		this.CSSoverrider.innerHTML = '#' + this.id + " .sublinks { max-height: 1000px; visibility: visible; transition: none; }"

		//Get full width of menus
		if(this.settings.displayMode !== 'stacked') {
			for(var i=0; i<this.topLevels.length; i++) {
				var mainSubmenu = this.topSublinks[i]
				mainSubmenu.style.width = mainSubmenu.scrollWidth + 'px'
			}
		}
		
		//Hide sublinks
		this.CSSoverrider.innerHTML = '#' + this.id + " .sublinks { transition: none; }"
		setTimeout(()=>{ this.CSSoverrider.innerHTML = "" }, 300) //Delay restoration of transition property to avoid initial shrink

		//Set display
		if(this.settings.displayMode === 'responsive') {
			if(window.innerWidth < this.settings.breakpoint) {
				this.navRoot.classList.add('stacked')
				this.settings.hoverMode = false //Disable hover if stacked and in responsive mode
			}
			else {
				this.navRoot.classList.remove('stacked')
				this.settings.hoverMode = this.originalHoverMode //reset any changes to original value on resize
			}
		}

		else if(this.settings.displayMode == 'stacked') {
			this.navRoot.classList.add('stacked')
		}

		else { //Only show horizontal
			this.navRoot.classList.remove('stacked')
		}

		if(!this.navRoot.classList.contains('stacked')) {
			//Align submenus on resize
			for(var i=0; i<this.topLevels.length; i++) {
				var mainSubmenu = this.topSublinks[i]
				var rect = this.topLevels[i].getBoundingClientRect()

				//Set styles
				mainSubmenu.style.top = rect.bottom + 'px'

				if(this.settings.alignSubmenus === 'right') {
					mainSubmenu.style.left = 'auto'
					mainSubmenu.style.right = window.innerWidth - rect.right

					var subrect = mainSubmenu.getBoundingClientRect()
					if(subrect.left < 0) { //Ensure  we aren't off-screen
						mainSubmenu.style.right = 'auto'
						mainSubmenu.style.left = rect.left + 'px'
					}
				}
				else if(this.settings.alignSubmenus === 'center') {
					var rectHalfWidth = (rect.right - rect.left) / 2
					mainSubmenu.style.left = rect.left + rectHalfWidth - mainSubmenu.clientWidth/2 + 'px'
					mainSubmenu.style.right = 'auto'

					var subrect = mainSubmenu.getBoundingClientRect()
					if(subrect.left < 0) { //Ensure  we aren't off-screen
						mainSubmenu.style.right = 'auto'
						mainSubmenu.style.left = rect.left + 'px'
					}

					var subrectRight = mainSubmenu.getBoundingClientRect().left + mainSubmenu.clientWidth
					if(subrectRight > window.innerWidth) { //Ensure we aren't off-screen
						mainSubmenu.style.left = 'auto'
						mainSubmenu.style.right = window.innerWidth - rect.right + 'px'
					}
				}
				else {//align left
					mainSubmenu.style.left = rect.left + 'px'
					mainSubmenu.style.right = 'auto'

					var subrectRight = mainSubmenu.getBoundingClientRect().left + mainSubmenu.clientWidth
					if(subrectRight > window.innerWidth) { //Ensure we aren't off-screen
						mainSubmenu.style.left = 'auto'
						mainSubmenu.style.right = window.innerWidth - rect.right + 'px'
					}
				}
			}
		}
	}

	hoverTopLevel(e) {
		if(this.settings.hoverMode === 'all' || this.settings.hoverMode === 'top_only')
			this.open(e)
	}

	hoverSubLevel(e) {
		if(this.settings.hoverMode === 'all')
			this.open(e)
	}

	unhover(e) {
		if(this.settings.hoverMode === 'all' || this.settings.hoverMode === 'top_only')
			this.close(e)
	}

	open(e) {
		//Check to make sure no other same-level links open
		var sameLevel = e.target.parentElement.querySelectorAll('.deepnav-link')
		for(var i=0; i < sameLevel.length; i++) {
			sameLevel[i].classList.remove('nav-list-open')
		}

		e.target.classList.add('nav-list-open')
	}

	close(e) {
		//Account for bug in Chrome (:-() that causes mouseleave event on click
		if(e.type === 'mouseleave' && (!e.releatedTarget && !e.toElement)) {
			return
		}

		//Check to make sure no other same-level links open
		var sameLevel = e.target.parentElement.querySelectorAll('.deepnav-link')
		for(var i=0; i < sameLevel.length; i++) {
			sameLevel[i].classList.remove('nav-list-open')
		}

		//Get all links
		var children = e.target.querySelectorAll('.deepnav-link')

		//Close all child submenus
		for(var i=0; i<children.length; i++) {
			children[i].classList.remove('nav-list-open')
		}

		e.target.classList.remove('nav-list-open')
	}

	closeAll(e) {
		for(var i=0; i<this.navLinks.length; i++) {
			this.navLinks[i].classList.remove('nav-list-open')
		}
	}

	toggleShown(e) {
		if(e.target.classList.contains('nav-list-open'))
			this.close(e)
		else
			this.open(e)
	}

	//Initialization (or reinitialization, if need be (say, new navigation elements are dynamically added))
	init() {
		//Main variables
		this.navRoot = document.getElementById(this.id)
		this.navLinks = document.getElementsByClassName('deepnav-link')
		this.topLevels = document.querySelectorAll("#" + this.id + ' > .deepnav-link')
		this.subLevels = document.querySelectorAll('#' + this.id + ' .sublinks > .deepnav-link')
		this.sublinks = document.getElementsByClassName('sublinks')
		this.topSublinks = document.querySelectorAll("#" + this.id + ' > .sublinks')

		//Set style if it doesn't already exist
		var DeepNavStyle = document.getElementById(this.id + 'DeepNavStyle')

		if(DeepNavStyle === null) {
			this.primarystyle = document.createElement('style')
			this.primarystyle.innerHTML = "#" + this.id + " .sublinks { visibility: hidden; pointer-events: none; padding: 0; margin: 0; }" +
				"#" + this.id + " .nav-list-open + .sublinks { visibility: visible; pointer-events: auto; }" + 
				"#" + this.id + " .sublinks a { display: block; }" + 
				"#" + this.id + " .sublinks { white-space: nowrap; }" + 
				"#" + this.id + ":not(.stacked) > .sublinks { position: absolute; }" +
				"#" + this.id + " .sublinks > .sublinks { position: relative; padding-top: 0; padding-bottom: 0; padding-right: 0; }"

			if(this.settings.showContentArrows) {
				this.primarystyle.innerHTML += "#" + this.id + " .sublinks .deepnav-link:not(.nav-list-open)::after { padding-left: .5em; content: '▾'; }" +
				"#" + this.id + " .sublinks .deepnav-link.nav-list-open::after { padding-left: .5em; content: '▴'; }"
			}

			if(this.settings.showDefaultAnimations) {
				this.primarystyle.innerHTML += "#" + this.id + " .sublinks { visibility: visible; max-height: 0; transition: max-height .5s cubic-bezier(0, 1, 0, 1), padding .5s, margin .5s, border-width 1s; overflow: hidden; }" +
				"#" + this.id + " .nav-list-open + .sublinks { max-height: 1000px; transition: max-height 1s ease-in-out; }"
			}

			if(this.settings.showAestheticStyling) {
				//Base
				this.primarystyle.innerHTML += "#" + this.id + " { white-space: nowrap; background-color: #DFDCE3; padding: .5em; }" + 
				"#" + this.id + " > a { margin: .5rem; padding: .5rem; }" + 
				"#" + this.id + " > a:hover { background-color: #F7B733; }" +
				"#" + this.id + " a:hover { color: white; cursor: pointer; }" +
				"#" + this.id + " > .deepnav-link { margin: 0 .5em; }" +
				"#" + this.id + " > .sublinks { background-color: white; }" +
				"#" + this.id + " > .deepnav-link:not(.nav-list-open) + .sublinks { border-width: 0; }" +
				"#" + this.id + " > .sublinks { border-style: solid; border-width: 2px; border-top-style: none; border-color: #DFDCE3; }" +
				"#" + this.id + " > .sublinks a { padding: .5em; }" +
				"#" + this.id + " .sublinks > .sublinks { padding-left: 1em; border-left-style: solid; border-left-width: 2px; border-color: #dfdce3; background: none; }" +
				"#" + this.id + " .sublinks > .sublinks a { padding-left: 1em; }" +
				"#" + this.id + " .sublinks a:hover { color: white; background-color: #F7B733; }" +
				"#" + this.id + " > .nav-list-open { background-color: #F7B733; color: white; }"

				//Stack
				this.primarystyle.innerHTML += "#" + this.id + ".stacked { max-width: 15em; }" +
					"#" + this.id + ".stacked > .sublinks { margin-left: 1em; border: none; }" +
					"#" + this.id + ".stacked > .sublinks > .sublinks { border-left-style: none; }" +
					"#" + this.id + ".stacked > .deepnav-link { padding: .25em; margin-left: 1em; line-height: 150%; }"

				this.primarystyle.id = this.id + 'DeepNavStyle'
			}

			document.head.insertAdjacentElement('afterbegin', this.primarystyle)

			//Add style override tag
			this.CSSoverrider = document.createElement('style')
			this.CSSoverrider.id = this.id + 'Override'
			document.head.appendChild(this.CSSoverrider)
		}

		//Position submenus on resize
		var context = this
		window.addEventListener('resize', function(){
			//use timeout to prevent resize event from firing excessivley
			clearTimeout(context.resizeId);
			context.resizeId = setTimeout(context.resizeScreen.bind(context), 500);
		})

		//Initial resize and bind
		this.bindEvents()
		this.resizeScreen()
	}
}