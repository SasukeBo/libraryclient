const host = 'http://localhost:3000'

function xhttp(action, method, callback, params) {
  var request = new XMLHttpRequest()
  request.open(method, host + action)
  request.addEventListener('load', function() {
    if (this.response) callback(JSON.parse(this.response))
    else callback(undefined)
  })

  if (['POST', 'PUT'].includes(method)) {
    request.setRequestHeader('Content-Type', 'application/json')
  }
  request.send(JSON.stringify(params))
}

export { xhttp }
