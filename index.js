module.exports = wrap

function wrap(options) {
  options = options || {}

  return function(stylesheet) {
    var rules = stylesheet.rules

    stylesheet.rules = rules.reduce(function(list, rule) {
      if (rule.type !== 'document') return concat(list, rule)

      var wrapper = getWrapper(rule.document)
      if (!wrapper) return concat(list, rule)
      var amperstand = wrapper.indexOf('&')

      if (amperstand === -1) {
        return concat(list, rule.rules.map(function(rule) {
          rule.selectors = rule.selectors.map(function(selector) {
            if (selector.indexOf('&') !== -1)
              return selector.replace(/\&/g, wrapper)

            return wrapper + ' ' + selector
          })

          return rule
        }))
      }

      var prefix = wrapper.slice(0, amperstand)
      var suffix = wrapper.slice(amperstand + 1)

      var append = rule.rules.map(function(rule) {
        if (prefix) {
          rule.selectors = rule.selectors.map(function(sel) {
            // special case for prefixing either classes/ids
            // or elements
            var element = !/[.#]/.test(sel[0])
            return element
              ? prefix.replace(/[-_]+$/g, ' ') + sel
              : prefix + sel.slice(1)
          })
        }

        if (suffix) {
          rule.selectors = rule.selectors.map(function(sel) {
            return sel + suffix
          })
        }

        return rule
      })

      return concat(list, append)
    }, [])

    return stylesheet
  }
}

function concat(parent, child) {
  if (Array.isArray(child)) {
    Array.prototype.push.apply(parent, child)
  } else {
    parent.push(child)
  }

  return parent
}

function getWrapper(document) {
  var match = document.match(/^\s*wrap\(([^)]+)\)/)
  if (match) return match[1]
}
