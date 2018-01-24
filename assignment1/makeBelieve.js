//Hér er lýst yfir nafnlausu falli og kallað í það beint
(function() {
  // Lýsa yfir constructor function hér, nota PascalCasing
  function MakeBelieveElement(DOMElements, length) {
    this.elements = DOMElements;
    this.length = length;

    //Fun begins

    this.data = function (key, value) {
      //key = background
      //value = #ffffff
      for (var i = 0; i < this.length; i++) {
        this.elements[i].style[key] = value;
        //<p data-background='#ffffff'></p>
      }
      return this;
    };

    this.nextSiblings = function () {
      var siblings = [];
      //loopa gegnum öll
    
      for (var i = 0; i < this.length; i++) {
        var currentElement = this.elements[i];
        if(currentElement.nextElementSibling) {
          siblings.push(currentElement.nextElementSibling);
        }
      }
      return new MakeBelieveElement(siblings, siblings.length);
    };
// 3 - Parent
    this.parent = function (query) {
      var temp = document.querySelectorAll(query);
      var parentList =[];
      for (var c = 0; c < this.length; c++) {
        if (query == undefined) {
          parentList.push(this.elements[c].parentNode);
          continue;
        }
        for (var p = 0; p < temp.length; p++) {
          if (temp[p] == (this.elements[c].parentNode)) {
            parentList.push(this.elements[c].parentNode);
          }
        }
      }
      return new MakeBelieveElement(parentList, parentList.length);
    }
// 4 - Grandparent
    this.grandParent = function (query) {
      var temp = document.querySelectorAll(query);
      var grandParentList =[];
      for (var c = 0; c < this.length; c++) {
        if (query == undefined) {
          grandParentList.push(this.elements[c].parentNode.parentNode);
          continue;
        }
        for (var p = 0; p < temp.length; p++) {
          if (temp[p] == (this.elements[c].parentNode.parentNode)) {
            grandParentList.push(this.elements[c].parentNode.parentNode);
          }
        }
      }
      return new MakeBelieveElement(grandParentList, grandParentList.length);
    }

// 5 - Ancestors - þetta er í einhverju rugli
  this.ancestor = function (query) {
    var ancestorList = [];
    var queryAncestor = document.querySelectorAll(query);
    //console.log(querySelectorAll(grandParentList));

    for (var e = 0; e < this.elements.length; e++) {
      for (var i = 0; i < queryAncestor.length; i++) {
        console.log(this.grandParent(query));
        var grandFunction = this.grandParent();
        if(queryAncestor[i] == this.elements[i].grandFunction){
          console.log(this.elements[i].grandParent());
          ancestorList.push(this.elements[i])
        }
      }
    }
    return new MakeBelieveElement(ancestorList, ancestorList.length);
  }

// 6 - Click handler  
  this.onClick = function (evt) {
    addEventListener('input', evt)
  }

<<<<<<< Updated upstream
// 6 - Click handler
  this.onClick = function (evt) {
    addEventListener('click', evt);
  }

// 7 - Overwrite
  this.insertText = function (text) {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].innerHTML = text;
      }
  }

// 8 - Append
  this.append = function (html) {
    var newElem = document.createElement('template');
    for (var i = 0; i < this.length; i++) {
      var node = this.elements[i];
      if(typeof html === 'string') {
        newElem.innerText = html;
        node.appendChild(newElem.content);
      }
      if(html instanceof Node) {
        node.appendChild(html)
      }
    }
    console.log(node);

  //10 - delete
    this.delete = function () {
      console.log(this.elements[0]);
      
      this.elements[0].parentNode.removeChild(this.elements[0]);
      
      console.log(this.elements[0]);
    }

  //11 - ajax


  // 12 - CSS()
    this.css = function (bla1, bla2) {

    }

    //13 - toggleClass
    this.toggleClass = function(query) {
      if(!this.elements[0].classList.contains(query)){
        this.elements[0].classList.add(query);
      }else{
        this.elements[0].classList.remove(query);
      }
      console.log(this.elements[0]);      
    }
    //14 - OnSubmit
    this.onSubmit = function (evt) {
      var elem = this.elements[0].firstChild;
      elem.parentElement[2].addEventListener('click', evt);
    }
    //15 - onInput
    this.onInput = function (evt) {
      var elem = this.elements[0].firstChild;     

      elem.parentElement[0].addEventListener("input", evt);
      elem.parentElement[1].addEventListener("input", evt);
    }

// End of fun
  };


  var innerMakeBelieve  = function (query) {
    //console.log(query);
    var elements = document.querySelectorAll(query);
    if(elements) {
      return new MakeBelieveElement(elements, elements.length);
    }
    return {};
  };
  //assign-a fallið __ svo það sé aðgegnilegt utan scope
  window.__ = innerMakeBelieve;

})();

/*__.ajax({
  url: '/some-url',
  method: 'GET',
  timeout: 10,
  data: {}, 
  headers: [
    { "Authorization": "my-secret-key" }
  ],
  success: function(resp) {

  },
  fail: function(error) {
    
  },
  beforeSend: function(xhr) {

  }
});*/

var css = __('#elemToChange').css('margin-bottom', '5px');
var prepender = __('.the-prepender').prepend('<p>I am an prepended paragraph!</p>');
var prependler = __('.the-prepender').prepend(
  document.createElement('p')
    .appendChild(
      document.createTextNode('I am an prepended paragraph!')
    )
);

var appender = __('.the-appender').append('<p>I am an appended paragraph!</p>');
var appendler = __('.the-appender').append(
  document.createElement('p')
    .appendChild(
      document.createTextNode('I am an appended paragraph!')
    )
);
__('#password').onClick(function (evt) {
  console.log(evt.target.value);
});
var insertText = __('#shakespeare-novel').insertText('To be, or not to be: this is the question');

//var parent = __('.child').parent('.apapabbi');
<<<<<<< Updated upstream
//var grandParent = __('#usrnm').grandParent('#grandfather');
//console.log(grandParent);
//console.log('Ancestors');
//var ancestor = __('#usrnm').ancestor('.ancestr');
//console.log(ancestor);
/*
=======
var grandParent = __('.childPaPa').grandParent('.grandpa1')
//console.log(parent);
console.log('Grandparent:');
console.log(grandParent);
/*var ancestor = __('#password').ancestor('.ancestor2');
console.log(ancestor);*/

// 10 - delete
__('.some-div h2').delete();

// 11 - ajax

// 12 - css
__('#csstest').css('margin-bottom', '5px');

// 13 - ToggleClass
__('#elemToChange').toggleClass('someClass');
// 14 - onSubmit
__('#my-form').onSubmit(function (evt) {
  alert("username and password submitted");
});
// 15 - onInput
__('#my-form').onInput(function (evt){
  console.log(evt.target.value);
});