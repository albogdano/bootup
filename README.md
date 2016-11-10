# bootUP [![Build Status](https://travis-ci.org/albogdano/bootup.svg?branch=master)](https://travis-ci.org/albogdano/bootup)
> ### A [Bootstrap](http://getbootstrap.com) + [Assemble](http://assemble.io) + [HTML5 Boilerplate](http://html5boilerplate.com) starter kit.

## Features

With **bootUP** you can quickly build responsive static websites and iterate on them _without refreshing the browser_!
It contains some of the most widely used frontend tools and frameworks.

- [Bootstrap](http://getbootstrap.com) - CSS and JS framework
- [Assemble](http://assemble.io) - static site generator
- [HTML5 Boilerplate](http://html5boilerplate.com) - HTML5 barebones template
- [Grunt](http://http://gruntjs.com) - Javascript build tool
- [Bootswatch](http://bootswatch.com) - a collection of Bootstrap themes
- [Font Awesome](http://fontawesome.io) - icon font

## Demo Site

### [Para Docs](https://paraio.org/docs/)

## Requirements

Skip this part if you already have Node.js, Grunt and Bower on your machine.

1. Get [Node.js](http://nodejs.org/)
2. Install Grunt - `$ npm install -g grunt-cli`
3. Install Bower - `$ npm install -g bower`

## Getting Started

1. [Download](https://github.com/albogdano/bootup/archive/master.zip) bootUP **or** clone it.
2. `$ npm install`
3. `$ grunt server`

**Other tasks:**

- Build: `$ grunt`
- Clean: `$ grunt clean`
- Clean & Build: `$ grunt cb` (also validates HTML and Javascript)

**Note:** if you get the error `ENOSPC` Error on Linux, do this:

```bash
$ echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p
```

## Settings

### Google Analytics

Edit `assemble.json` and change `ga` to your tracking id and `domain` to match the domain you use for Google Analytics.


### Switching themes

Edit `assemble.json` and change `theme` to any of the Bootswatch theme names:

`amelia`, `cerulean`, `cosmo`, `cyborg`, `darkly`, `flatly`, `journal`, `lumen`, `readable`,
`simplex`, `slate`, `spacelab`, `superhero`, `united`, `yeti`

Use `default` for the vanilla Bootstrap style.

### Switching templates

Edit `assemble.json` and change `template` to one of the following:

`modern-business`, `grayscale`, `monolite`

Currently there are three templates to choose from:

- [Modern Business](http://startbootstrap.com/modern-business) - a full site Bootstrap template
- [Grayscale](http://startbootstrap.com/grayscale) - a nice black & white single page template
- Monolite - a Grayscale clone but lighter. Great as a template for documentation!

Feel free to add more templates by creating a pull request or you could just ask me politely :wink:

## License
[MIT License](LICENSE)
