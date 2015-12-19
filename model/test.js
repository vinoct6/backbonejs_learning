console.log("Model test page : test.js");

//Create our own model
//entend is a function shared by Model, Collection, Router and View.
//It establishes inheritence relationship between two objects

//The second argument is where you can define the class properties
var Vehicle = Backbone.Model.extend({
    prop1 : '1',
},{
    summary : function() { //class property
          return "Vehicles are travelling..";
    }
  }
);

//Instantiate our model using new operator

var v = new Vehicle(); //constructor function
var v2 = new Vehicle();

v.prop1 = 'one';

console.log (v.prop1); //Property just changed for one instance
console.log (v2.prop1); //v2's property remains the same


//Class property is like static prperty in Java. They become available directly on the types
console.log (Vehicle.summary());

//---- inheritence---

//Models can inherit from other models

var Car = Vehicle.extend({});

var A = Backbone.Model.extend({
  initialize : function () {
    console.log ("Init object type A");
  },

  asString : function () {
      return JSON.stringify(this.toJSON());
  }


});

var a = new A({
    one : '1',
    two : '2'
});

console.log(a.asString());

var B = A.extend({});

var b = new B ({
  three : '3',
  four :'4'
}
);

console.log(b.asString());

console.log (b instanceof A); //true
console.log (b instanceof Backbone.Model);
