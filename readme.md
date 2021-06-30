# DeepNav
The purpose of DeepNav is to provide a flexible, multilevel, drop-in navigation system that requires minimal in-HTML markup. DeepNav supports as many levels of navigation as good taste will allow, and then some. You need only set up a couple of divs and anchors, initialize DeepNav, and you're good to go!

Features:
*   As many nested levels of navigation as you dare
*   Options for click-to-open menus, hover-only menus, or top-level hovering with clickable submenus
*   Easy-to-implement responsivity
*   Easily stylable and highly customizable

Check out [the CodePen example](https://codepen.io/jwrunge/pen/eYWmQwY) to play around with settings and styling.

## Contents
1. [Development][1]
2. [Installation][2]
3. [Implementation][3]
5. [Styling][4]

## Development
Author: Jacob Runge

* Check out my website, [JacobRunge.com](jacobrunge.com)
* See the code on [GitHub](https://github.com/jwrunge/DeepNav)
* Get the Node package via [NPM](https://www.npmjs.com/package/@jwrunge/deepnav)

### Support the developer!
This code is provided under the MIT license, and is completely free to use and modify in any personal or commercial projects--just because I like you! If you are using this code in an application that is making you money, or even if you just think it's super neat and want to support me as a developer, consider a small tip at the "Buy me a coffee!" link below. It's much appreciated! :-)

<a href="https://www.buymeacoffee.com/jwrunge" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" height="41" width="174"></a>

## Installation
### Via NPM
Install via NPM: `npm install @jwrunge/deepnav`

Or download a local copy of the code [here](https://github.com/jwrunge/DeepNav/dist/deepnav.js).

## Implementation
### The JavaScript
There are two ways to implement DeepNav:
* Including as a script tag
* Including as a module

Importing via script tag is easy-peasy:
```
<script src="path/to/deepnav.js">
<script>
    new deepnav("myNav", {options})
</script>
```

If importing via NPM, *do not* name your import. It will be available in your code as `deepnav`.
```
<script type="module">
    import '@jwrunge/modal'
    new deepnav("myNav", {options})
</script>
```

The first argument to `deepnav()` should be the ID of the navigation structure you want to convert to a DeepNav navigation system. The second argument is a JavaScript dictionary, where you can pass various customization options to deepnav (detailed in ["Customization"](#customization) below).

### The HTML
The HTML markup of your navigation structure should consist of a root `div` with an ID that you pass to the `new deepnav()` constructor. To create a sub-list of links, nest an `<a>` tag with the class `deepnav-link`, followed by a `div` with the class `.sublinks`. An example:

```
<div id='myNav'>
    <a href="some/cool/place">Leve 1 terminal link</a>

    <a class='deepnav-link'>Level 1 submenu link</a>
    <div class='sublinks'>
        <a href="another/cool/place">Level 2 terminal link</a>

        <a class='deepnav-link'>Level 2 submenu link</a>
        <div class='sublinks'>
            <a href="a/third/cool/place">Level 3 terminal link</a>
        </div>
    </div>
</div>
```

In the above example, DeepNav would create a menu system with two root-level links, one terminal link and one that opens a submenu. The submenu then would contain two links, one terminal link and one that opens a submenu. That submenu would then open a third-level terminal link.

## Customization
The following is a list of customization options, which you can pass in a JavaScript dictionary to the second parameter of the `deepnav()` constructor.

You can change any of these preferences on the fly if you set up a reference to your DeepNav instance (`var myNav = new deepnav('coolId')`) by altering `myNav.settings.settingIWantToChange`.

|prop                   |default        |description    |
|---                    |---            |---            |
|hoverMode              |""             |*Possible values include 'all', 'top\_only', or any falsey value.* This determines whether or not your anchors will open submenus on hover (they always respond to 'click'). 'all' signifies that all anchors will open submenus on hover (this is really a nightmare with a stacked menu); 'top\_only' means that only your top-level anchors will respond to hover (you have to click on submenu anchors); false means users have to click.|
|alignSubmenus          |"center"       |*Possible values include 'right', 'left', and 'center'.* This affects how dropdown menus are displayed relative to the anchor when DeepNav is not in 'stacked' mode (i.e. a horizontal rather than a vertical menu). No worries--DeepNav will do its best not to let your menu go off-screen; if a menu is aligned 'left' and goes off-screen to the right, DeepNav will automatically change alignment to 'right' for that menu.|
|showContentArrows      |true           |*Possible values include boolean true or false.* This determines whether or not DeepNav adds open/close arrows to submenus. You MUST encode your HTML with UTF-8 (meta charset='utf-8' in the document head) for this to work anywhere outside of Chrome.|
|showDefaultAnimations  |true           |*Possible values include boolean true or false.* This determines whether or not DeepNav is allowed to animate the opening and closing of your submenus. For the most part, I think the animations are sufficient for most designs.|
|showAestheticStyling   |true           |*Possible values include boolean true or false.* **You will likely want to set this one to false to give you some control over the aesthetic styling,** or else your navigation will come out looking like it does in the demo at the top of this page; otherwise, it is simple to override these styles if you wish to include them as a jumping off point.|
|displayMode            |"responsive"   |*Possible values include 'reponsive', 'horizontal', and 'stacked'.* 'horizontal' will leave the menu in horizontal mode (best for wide screens); 'stacked' will leave the menu in 'stacked'/vertical mode (best for mobile devices in, say, a hamburger menu). 'responsive' will adapt itself between 'stacked' and 'horizontal' based on a breakpoint. 'responsive' also plays with the navigation style when your menu is in Hover Mode, removing hover functionality while the menu is stacked.|
|breakpoint             |500            |*A number value.* This defines the pixel width at which your menu changes from horizontal to stacked while in the responsive Display Mode.|

## Styling
DeepNav programmatically sets some initial styles for each instance of DeepNav that you invoke. These styles are placed at the beginning of your document head so that they can be overridden easily, but the aesthetic styles in particular are pretty tough to override. I recommend you disable them via the customization options listed above.

Important styling classes:
I have included the most important classes for custom CSS styling below. This is not an exhaustive list, but your browser's inspector will likely give you the best idea of what to style for your specific use case.

|class                  |description        |
|---                    |---                |
|.sublinks              |A `div` containing anchor links and possibly other `.sublinks`.|
|.deepnav-link          |A link that opens a `.sublinks` container.|
|.nav-list-open         |Applied to a `.deepnav-link` to indicate that the submenu is open.|
|.stacked               |Applied to the root DeepNav `div` when it is displayed in stacked mode.|

[1]: #development
[2]: #installation
[3]: #implementation
[4]: #styling