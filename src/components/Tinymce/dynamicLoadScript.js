let callbacks = []

function loadedTinymce() {
  // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2144
  // check is successfully downloaded script
  return window.tinymce
}

const dynamicLoadScript = (src, callback) => {
  const existingScript = document.getElementById(src)
   // eslint-disable-next-line
  const cb = callback || function() {}

  if (!existingScript) {
    const script = document.createElement('script')
    script.src = src // src url for the third-party library being loaded.
    script.id = src
    document.body.appendChild(script)
    callbacks.push(cb)
     // eslint-disable-next-line
    const onEnd = 'onload' in script ? stdOnEnd : ieOnEnd
    onEnd(script)
  }

  if (existingScript && cb) {
    if (loadedTinymce()) {
      cb(null, existingScript)
    } else {
      callbacks.push(cb)
    }
  }

  function stdOnEnd(script) {
     // eslint-disable-next-line
    script.onload = function() {
      // this.onload = null here is necessary
      // because even IE9 works not like others
       // eslint-disable-next-line
      this.onerror = this.onload = null
       // eslint-disable-next-line
      for (const cb of callbacks) {
        cb(null, script)
      }
      callbacks = null
    }
     // eslint-disable-next-line
    script.onerror = function() {
       // eslint-disable-next-line
      this.onerror = this.onload = null
       // eslint-disable-next-line
      cb(new Error('Failed to load ' + src), script)
    }
  }

  function ieOnEnd(script) {
     // eslint-disable-next-line
    script.onreadystatechange = function() {
      if (this.readyState !== 'complete' && this.readyState !== 'loaded') return
        this.onreadystatechange = null
      // eslint-disable-next-line
      for (const cb of callbacks) {
        cb(null, script) // there is no way to catch loading errors in IE8
      }
      callbacks = null
    }
  }
}

export default dynamicLoadScript
