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
      //console.log(this.elements);
      var siblings = [];
      for (var i = 0; i < this.length; i++) {
        var currentElement = this.elements[i];
        if(currentElement.nextElementSibling) {
          siblings.push(currentElement.nextElementSibling);
        }
      }
      var parentList =[];
      for (var i = 0; i < siblings.length; i++) {
        var currentElement = siblings[i];
        if(!(parentList.includes(currentElement.parentNode)))
          parentList.push(currentElement.parentNode);
       }
       return new MakeBelieveElement(parentList, parentList.length);


    }
// 4 - Grandparent
    this.grandParent = function (query) {
      console.log(this.elements);
      var siblings = [];
      for (var i = 0; i < this.length; i++) {
        var currentElement = this.elements[i];
        console.log(currentElement.parentNode.parentNode);
        if(currentElement.nextElementSibling) {
          siblings.push(currentElement.nextElementSibling);
        }
      }
       var grandParentList =[];
       for (var i = 0; i < siblings.length; i++) {
         var currentElement = siblings[i];
         if(!(grandParentList.includes(currentElement.parentNode.parentNode)))
           grandParentList.push(currentElement.parentNode.parentNode);
        }
        return new MakeBelieveElement(grandParentList, grandParentList.length);
    }

// 5 - Ancestors
  this.ancestor = function (query) {
    //console.log(this.elements[0])
    var elem = this.elements[0].parentNode.parentNode;
    return elem;
  }


// 6 - Click handler


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
//var parent = __('.orphan').parent()
var grandParent = __('#Fanney').grandParent()
//console.log(parent);
console.log('Grandparent:');
console.log(grandParent);
