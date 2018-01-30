/**
 * Fanney Þóra Vilhjálmsdóttir - fanneyv12
 * Steingrímur Arnar Jónsson - steingrimur13
 */

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

      for (var e = 0; e < this.elements.length; e++) {
        for (var i = 0; i < queryAncestor.length; i++) {
          var grandFunction = this.grandParent();
          if(queryAncestor[i] == this.elements[i].grandFunction){
            ancestorList.push(this.elements[i])
          }
        }
      }
      return new MakeBelieveElement(ancestorList, ancestorList.length);
  }


// 6 - Click handler
    this.onClick = function (evt) {
      addEventListener('click', evt);
    }
// 7 - Overwrite
    this.insertText = function (text) {
      var texts = this.elements;
        for (var i = 0; i < this.length; i++) {
          texts[i].innerHTML = text;
        }
        return new MakeBelieveElement(texts, texts.length);
      }
// 8 - Append
    this.append = function (html) {
      var child = document.createElement('template');
         for (var i = 0; i < this.length; i++) {
           var parent = this.elements[i];
           if (typeof html === 'string') {
             child.innerHTML = html;
             parent.appendChild(child.content.firstChild);
           }
           else if (html instanceof Node) {
             var elem = html.parentNode;
             for (var i = 0; i < elem.length; i++) {
               elem[i].innerHTML = html;
             }
             parent.appendChild(elem,html);
           }
         }
         return new MakeBelieveElement(parent, parent.length);
    }
// 9 - Prepend
    this.prepend = function (html) {
      var child = document.createElement('template');
      for (var i = 0; i < this.length; i++) {
        var parent = this.elements[i];
        if (typeof html === 'string') {
          child.innerHTML = html;
          parent.insertBefore(child.content.firstChild, parent.firstChild);
        }
        else if (html instanceof Node) {
          var elem = html.parentNode;
          for (var i = 0; i < elem.length; i++) {
            elem[i].innerHTML = html;
          }
          var p = elem + html;
          parent.insertBefore(elem, parent.firstChild);
        }
      }
      return new MakeBelieveElement(parent, parent.length);
    }

//10 - delete
    this.delete = function () {
      var elems = this.elements;
      for (var i = 0; i < this.length; i++) {
        elems[i].remove();
      }
      return new MakeBelieveElement(elems, elems.length);
    }

//11 - ajax

// 12 - CSS()
    this.css = function (myKey, value) {
      var selector = this.elements;
      for (var i = 0; i < selector.length; i++) {
        selector[i].setAttribute(
          'style',
          '' + myKey + ': ' + value + ';'
        );
      }
      return new MakeBelieveElement(selector, selector.length);
    }
//13 - toggleClass
    this.toggleClass = function(myClass) {
      var elems = this.elements;
      for (var i = 0; i < elems.length; i++) {
        if(!elems[i].classList.contains(myClass)){
          elems[i].classList.add(myClass);
        }
        else {
          elems[i].classList.remove(myClass);
        }
      }
      return new MakeBelieveElement(elems, elems.length);
    }
//14 - OnSubmit
    this.onSubmit = function (evt) {
      for (var i = 0; i < this.length; i++) {
        //var elem = this.elements[i].firstChild;
        this.elements[i].addEventListener('submit', evt);
      }
      //var elem = this.elements[0].firstChild;
    }
//15 - onInput
    this.onInput = function (evt) {
      for (var i = 0; i < this.length; i++) {
        this.elements[i].addEventListener('input', evt);
      }
    }
// End of fun
  };
  var innerMakeBelieve  = function (query) {
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

// 3 - parent
__('#password').parent();
__('#password').parent('form');
// 4 - grandParent
__('#password').grandParent();
__('#password').grandParent('#grandfather');
__('#password').grandParent('#unknownID');
// 5 - ancestor
__('#username').ancestor('.ancestr');
// 6 - onClick
__('#password').onClick(function (evt) {
  console.log(evt.target.value);
});
// 7 - insertText
__('#shakespeare-novel').insertText('To be, or not to be: this is the question');
// 8 - append
__('.the-appender').append('<p>I am an appended paragraph!</p>');
__('.the-appender').append(
  document.createElement('p')
  .appendChild(
    document.createTextNode('I am an appended paragraph!')
  )
);
// 9 - prepend
__('.the-prepender').prepend('<p>I am an prepended paragraph!</p>');
__('.the-prepender').prepend(
  document.createElement('p')
  .appendChild(
    document.createTextNode('I am an prepended paragraph!')
  )
);
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
