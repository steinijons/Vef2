//studdist við þetta til að koma mér af stað https://www.youtube.com/watch?v=1BMYFAFPrfc

/*function __(someSelector){
  var input = {};
  input.someSelector = someSelector;
  input.element = document.querySelector(input.someSelector);


}*/
//Hér er lýst yfir nafnlausu falli og kallað í það beint
//
(function() {
  // Lýsa yfir constructor function hér, nota PascalCasing
  function MakeBelieveElement(DOMElements, length) {
    this.elements = DOMElements;
    this.length = length;

    //Functions

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
    this.parent = function (query = null) {
      if(this.elements) {
        return this.elements[0].parentNode
      }
      return null
    }
// 4 - Grandparent
    this.grandParent = function (query = null) {
      if(this.elements) {
        return this.elements[0].parentNode.parentNode
      }
      return null
    }

// 5 - Ancestors
  this.ancestor = function (query) {

  }

// 6 - Click handler


// End of function
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
var parent = __('.child').parent()
var grandParent = __('.child').grandParent()
console.log(parent)
console.log(grandParent)
