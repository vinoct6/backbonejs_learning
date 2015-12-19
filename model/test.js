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
