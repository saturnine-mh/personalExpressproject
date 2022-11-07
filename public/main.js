var trash = document.getElementsByClassName("fa-trash-o");
var check = document.getElementsByClassName("fa-check-circle-o");

Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
        const name = this.parentNode.parentNode.childNodes[1].innerText
        const msg = this.parentNode.parentNode.childNodes[3].innerText
        const sets =this.parentNode.parentNode.childNodes[5].innerText
        const Reps = this.parentNode.parentNode.childNodes[7].innerText

        
      
        console.log(name, msg, sets, Reps)
        fetch('dates', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            'name': name,
            'msg': msg,
            'sets': sets,
            'Reps': Reps
          })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
Array.from(check).forEach(function(element) {
  element.addEventListener('click', function(){
    const date = this.parentNode.parentNode.childNodes
    let boxElement = this.parentNode.parentNode.parentNode;
    // boxElement.style.backgroundColor= 'green'
    console.log("html",this.parentNode.parentNode.parentNode, date)
    console.log("date", date[0].wholeText)
    fetch('dates', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      'date': date[0].wholeText.trim(),
       'backgroundColor': 'green'

      })
    }).then(function (response) {
     window.location.reload()
    })
  });
});
