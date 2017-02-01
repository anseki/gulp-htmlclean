# gulp-htmlclean

[![npm](https://img.shields.io/npm/v/gulp-htmlclean.svg)](https://www.npmjs.com/package/gulp-htmlclean) [![GitHub issues](https://img.shields.io/github/issues/anseki/gulp-htmlclean.svg)](https://github.com/anseki/gulp-htmlclean/issues) [![David](https://img.shields.io/david/anseki/gulp-htmlclean.svg)](package.json) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE-MIT)

This [gulp](http://gulpjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [Grunt](http://gruntjs.com/) plugin: [grunt-htmlclean](https://github.com/anseki/grunt-htmlclean)
* [webpack](http://webpack.github.io/) loader: [htmlclean-loader](https://github.com/anseki/htmlclean-loader)

**If you want to just clean files, [Command Line Tool](https://github.com/anseki/htmlclean) is easy way.**

Simple and safety HTML/SVG cleaner to minify without changing its structure.

For example, more than two whitespaces (even if those are divided by tags) in a line are reduced.

Before:

```html
<p>The <strong> clean <span> <em> HTML is here. </em> </span> </strong> </p>
```

After:

```html
<p>The <strong>clean <span><em>HTML is here.</em></span></strong></p>
```

The whitespace that was on the right side of the `<strong>` was removed, and one on the left side was kept. And whitespaces on the both side of the `<em>` were removed.

For example, unneeded whitespaces in path data of SVG are reduced. In the case of this SVG file, 4,784 bytes were reduced:

<img src="https://rawgit.com/anseki/grunt-htmlclean/master/Ghostscript_Tiger.svg" width="300" height="300">

## Removing

htmlclean removes following texts.

+ Leading and trailing whitespaces (tabs and line-breaks are included)
+ Unneeded whitespaces between HTML/SVG tags
+ More than two whitespaces (reduced to one space)
+ HTML/SVG comments
+ Unneeded whitespaces, meaningless zeros, numbers, signs, etc. in path data of SVG (e.g. `d` attribute of `path` element, `path` attribute of `animateMotion` element, etc.)

## Protecting

Following texts are protected (excluded from [Removing](#removing) list).

+ Texts in `textarea`, `script` and `style` elements, and text nodes in `pre` elements
+ Quoted texts in tag attributes except path data of SVG
+ Texts in SSI tags (PHP, JSP, ASP/ASP.NET and Apache SSI)
+ IE conditional comments (e.g. `<!--[if lt IE 7]>`)
+ Texts between `<!--[htmlclean-protect]-->` and `<!--[/htmlclean-protect]-->`
+ Texts that is matched by [`protect`](#protect) option

## More Information

See [htmlclean](https://github.com/anseki/htmlclean).

## Getting Started

```shell
npm install gulp-htmlclean --save-dev
```

## Usage

`gulpfile.js`

```js
var gulp = require('gulp'),
  htmlclean = require('gulp-htmlclean');

gulp.task('default', function() {
  return gulp.src('./develop/*.html')
    .pipe(htmlclean({
        protect: /<\!--%fooTemplate\b.*?%-->/g,
        edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
      }))
    .pipe(gulp.dest('./public_html/'));
});
```

See [htmlclean](https://github.com/anseki/htmlclean) for options and more information.
