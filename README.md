# gulp-htmlclean

This [gulp](http://gulpjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [Grunt](http://gruntjs.com/) plugin: [grunt-htmlclean](https://github.com/anseki/grunt-htmlclean)

**If you want to just clean files, [Command Line Tool](https://github.com/anseki/htmlclean) is easy way.**

Simple and safety cleaner without changing the structure to minify HTML/SVG.

## Removing

htmlclean removes the following texts.

+ The leading whitespaces, tabs and line-breaks, and the trailing whitespaces, tabs and line-breaks.
+ The unneeded whitespaces, tabs and line-breaks between HTML/SVG tags.
+ The more than two whitespaces, tabs and line-breaks (suppressed to one space).
+ HTML/SVG comments.
+ The unneeded whitespaces, tabs and line-breaks, meaningless zeros, numbers, signs, etc. in the path data of SVG (e.g. `d` attribute of `path` element).

For example, the more than two whitespaces (even if those are divided by HTML/SVG tags) in a line are suppressed:

* Before

```html
<p>The <strong> clean <span> <em> HTML is here. </em> </span> </strong> </p>
```

* After

```html
<p>The <strong>clean <span><em>HTML is here.</em></span></strong></p>
```

The whitespace that was right side of `<strong>` was removed, and the left side was kept.  
The both side whitespaces of `<em>` were removed.

For example, in a case of this SVG file, 4,784 bytes were reduced:

<img src="Ghostscript_Tiger.svg" width="300" height="300">

## Protecting

The following texts are protected (excluded from [Removing](#removing)).

+ The texts in `textarea`, `script` and `style` elements, and the text nodes in `pre` elements.
+ The quoted texts in the tag attributes.
+ The texts in the SSI tags (PHP, JSP, ASP/ASP.NET and Apache SSI).
+ IE conditional comments. e.g. `<!--[if lt IE 7]>`
+ The texts between `<!--[htmlclean-protect]-->` and `<!--[/htmlclean-protect]-->`.
+ The texts that is matched by the [`protect`](#protect) option.

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
