# wrap-selectors #

Wrap CSS selectors up within a prefix and/or suffix, for example:

``` css
/* this: */
@document wrap(.module-name) {
  .header {
    font-family: 'Helvetica Neue', sans-serif;
    font-weight: 100;
  }
}

/* becomes this: */
.module-name .header {
  font-family: 'Helvetica Neue', sans-serif;
  font-weight: 100;
}
```

## Usage ##

`wrap-selectors` is a rework plugin, so you can just use it like so:

``` javascript
var wrap = require('wrap-selectors')
var rework = require('rework')
var fs = require('fs')

var css = fs.readFileSync(
  __dirname + '/index.css', 'utf8'
)

css = rework(css)
  .use(wrap())
  .toString()

console.log(css)
```

Here's a few more usage examples for you:

``` css
@document wrap(.prefix-&:hover) {
  .hello { color: blue }
}

@document wrap(.prefix:hover) {
  .hello { color: green }
}

@document wrap(.prefix-&) {
  .hello { color: red }
  span { font-weight: bold }
}
```

Which would result in this output:

``` css
.prefix-hello:hover { color: blue; }

.prefix:hover { color: green; }

.prefix-hello { color: red; }
.prefix span { font-weight: bold; }
```
