# gulp-htmlclean

This [gulp](http://gulpjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

* [Grunt](http://gruntjs.com/) plugin: [grunt-htmlclean](https://github.com/anseki/grunt-htmlclean)

**If you want to just clean files, [Command Line Tool](https://github.com/anseki/htmlclean) is easy way.**

Simple and lightweight cleaner that just removes whitespaces, comments, etc. to minify HTML/SVG.  
This differs from others in that this removes whitespaces, line-breaks, etc. as much as possible.

## Removing
htmlclean removes the following texts.

+ The leading whitespaces, tabs and line-breaks, and the trailing whitespaces, tabs and line-breaks.
+ The unneeded whitespaces, tabs and line-breaks between HTML/SVG tags.
+ The more than two whitespaces, tabs and line-breaks (suppressed to one space).
+ HTML/SVG comments.

The more than two whitespaces (even if those are divided by HTML/SVG tags) in a line are suppressed.

**Example:**

Before

```html
<p>The <strong> clean <span> <em> HTML is here. </em> </span> </strong> </p>
```

After

```html
<p>The <strong>clean <span><em>HTML is here.</em></span></strong></p>
```

The whitespace that was right side of `<strong>` was removed, and the left side was kept.  
The both side whitespaces of `<em>` were removed.

## Protecting
The following texts are protected (excluded from removing).

+ The texts in `textarea`, `script` and `style` elements, and text nodes in `pre` elements.
+ The quoted texts in tag attribute.
+ The texts in SSI tags (PHP, JSP, ASP/ASP.NET and Apache SSI).
+ IE conditional comments. e.g. `<!--[if lt IE 7]>`
+ The texts between `<!--[htmlclean-protect]-->` and `<!--[/htmlclean-protect]-->`.
+ The texts that is matched by `protect` option (see "Options").

## More Informations
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

## History
 * 2015-02-21			v2.4.0			Update package.json for htmlclean v2.4.0.
 * 2015-02-13			v2.3.0			Update package.json for htmlclean v2.3.0.
 * 2014-09-16			v2.2.0			Initial release for htmlclean v2.2.0.
