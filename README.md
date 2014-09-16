# gulp-htmlclean

Simple and lightweight cleaner that just removes whitespaces, comments, etc. to minify HTML.  
This [gulp](http://gulpjs.com/) plugin is wrapper of [htmlclean](https://github.com/anseki/htmlclean).

[HtmlCompressor](http://code.google.com/p/htmlcompressor/), [HTMLMinifier](https://github.com/kangax/html-minifier) and others are better choice if you want to control details of editing.  
Those configuring are a little pain in the neck for me. And the results was not what I need. So, I wrote htmlclean. This removes unneeded whitespaces, line-breaks, comments, etc. That's all.

## Removing
htmlclean removes the following texts.

+ The leading whitespaces, tabs and line-breaks, and the trailing whitespaces, tabs and line-breaks.
+ The unneeded whitespaces, tabs and line-breaks between HTML tags.
+ The more than two whitespaces, tabs and line-breaks (suppressed to one space).
+ HTML comments.

The more than two whitespaces (even if those are divided by HTML tags) in a line are suppressed.

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
 * 2014-09-16			v2.2.0			Initial release for htmlclean v2.2.0. (fix version number.)
