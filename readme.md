DeepNav Navigation System
=========================

Created by **Jacob Runge**

Visit my [website](http://jacobrunge.com)!

About DeepNav
-------------

The purpose of DeepNav is to provide a flexible, multilevel, drop-in navigation system that requires minimal in-HTML markup. DeepNav supports as many levels of navigation as good taste will allow, and then some. You need only set up a couple of divs and anchors, initialize DeepNav, and you're good to go!

Features
--------

*   As many nested levels of navigation as you dare
*   Options for click-to-open menus, hover-only menus, or top-level hovering with clickable submenus
*   Easy-to-implement responsivity
*   Easily stylable and highly customizable

How to
------

1.  Include deepnav.js in a script tag in your document. (It's [here](./deepnav.js). Or you can grab it minified [here](./deepnav.min.js).) I'll provide other project inclusion methods if there is an interest!
2.  Create a navigation structure like the one shown below. This structure should include a div with an ID of your choosing. Your submenu anchors should contain a class called 'deepnav-link' and be followed by a div with the class 'sublinks'.
4.  Initialize DeepNav using `DeepNav(_yourChosenID_)`
5.  DeepNav should now take over your navigation structure... but it's not looking like you want it to. Fortunately, `DeepNav()` takes an optional second parameter, which you can pass an object full of settings (detailed in the next section).

![](./code_snip.jpg)

Customization
-------------

DeepNav takes an object full of options as it's second parameter. Those options include:

*  **hoverMode**: Possible values include 'all', 'top\_only', or boolean false; default is false. This determines whether or not your anchors will open submenus on hover (they always respond to 'click'). 'all' signifies that all anchors will open submenus on hover (this is really a nightmare with a stacked menu); 'top\_only' means that only your top-level anchors will respond to hover (you have to click on submenu anchors); false means users have to click.
*  **alignSubmenus**: Possible values include 'right', 'left', and 'center' (default 'center'). This affects how dropdown menus are displayed relative to the anchor when DeepNav is not in 'stacked' mode (i.e. a horizontal rather than a vertical menu). No worries--DeepNav will do its best not to let your menu go off-screen; if a menu is aligned 'left' and goes off-screen to the right, DeepNav will automatically change alignment to 'right' for that menu.
*  **showContentArrows**: Possible values include boolean true or false (default true). This determines whether or not DeepNav adds open/close arrows to submenus. You MUST encode your HTML with UTF-8 (meta charset='utf-8' in the document head) for this to work anywhere outside of Chrome.
*  **showDefaultAnimations**: Possible values include boolean true or false (default true). This determines whether or not DeepNav is allowed to animate the opening and closing of your submenus. For the most part, I think the animations are sufficient for most designs.
*  **showAestheticStyling**: Possible values include boolean true or false (default true). You'll probably want to set this one to false to give you some control over the aesthetic styling, or else your navigation will come out looking like it does at the top of this page.
*  **displayMode**: Possible values include 'reponsive', 'horizontal', and 'stacked'; default is 'responsive'. 'Horizontal' will leave the menu in horizontal mode (best for wide screens); 'stacked' will leave the menu in 'stacked'/vertical mode (best for mobile devices in, say, a hamburger menu). 'responsive' will adapt itself between 'stacked' and 'horizontal' based on a breakpoint. 'responsive' also plays with the navigation style when your menu is in Hover Mode, removing hover functionality while the menu is stacked.
*  **breakpoint**: A number value; default is 500. This defines the pixel width at which your menu changes from horizontal to stacked while in the responsive Display Mode.

You can change any of these preferences on the fly if you set up a reference to your DeepNav instance (`var ref = new DeepNav('coolId'`) by altering `myNav.settings.settingIWantToChange`

Styling
-------

DeepNav programmatically sets some initial styles for each instance of DeepNav that you invoke. These styles are placed at the beginning of your document head so that they can be overridden easily, but the aesthetic styles are pretty tough to override. I recommend you disable them.