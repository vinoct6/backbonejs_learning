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

//-----------Attributes
//use set and get method for attributes. escape is like get, but used to escape html

var Animal = Backbone.Model.extend({
    dump : function(){
          console.log(JSON.stringify(this.toJSON()));
    }
});


var cat = new Animal ({type : 'mammal'});

cat.set ({
    color : 'black',
    name : 'tintin'
});

//if you append the below page to browser window, it will print the alert window
cat.set({description : '<script> alert("This is injection"); </script>'})

cat.dump();

console.log(cat.escape('description')); // &lt;script&gt; This is injection &lt;/script&gt;

//---- Events

// -- Models raise events when the state changes.'change' event listens for a state change.

//ford.on('change', function(){})
//ford.on('change:color', function(){}) //listen for change to single property.
//This technique is called event name spacing

var ford = new Backbone.Model({
    type : 'car',
    color : 'blue'
})

ford.on('change', function(){
      console.log( "something" + " has changed"); //is there a way to display which property has changed ?
})

ford.on('change:color', function(){
      console.log("Color " + " has changed");
})


ford.set('type','van');
ford.set('color','red');

// Use the trigger method to trigger an event.

//ford.trigger('retired');

var volcano = _.extend({},Backbone.Events); //add the contents of Backbone.Events and returns the volcano object

volcano.on("disaster:eruption", function(opt) {
   console.log("duck and cover " + opt.plan );
});

volcano.trigger('disaster:eruption',{plan : 'run'});

volcano.off('disaster:eruption'); //Remove every event handler associated with that event.

// -- Model Identity

/*The id property represents the model's persistant identity. It is undefined until the model has
been saved. When model is saved, the id is set to server's identifier .
The cid is a temporary identfier, used until the object is assigned an id property. Once a model is
saved, cid is no longer required.  Model objects have a isNew method, that is used to identify if hte model
has been saved and has an id property*/

var ford = new Backbone.Model({});
console.log(ford.id); //undefined
console.log(ford.cid); //c8
console.log(ford.isNew()); // true - it hasn't been saved to server.

// -- Defaults

/*When you define a new backbone model, you have the option to specifiy the default attributes. These specifiy
the default values for attributes that are not set in the constructor*/

var Vehicle =  Backbone.Model.extend({   //look there is no 'new' keyword here
    defaults : {
          'color' : 'white',
          'type' : 'car'
    }
});

var car = new Vehicle();
console.log(car.get('color')); //white

//---Validation

/*Backbone exposes Model validity through two methods. 'validate' and 'isValid'.
'validate' tests the validity of the model and returns any errors found.
'isValid' returns a boolean indicating if the model is currently valid or not according the validate method

Validate is called by backbone prior to performing'set' and 'save' operations.
backbone now requires the {validate:true} to be passed with 'set' to trigger validation.
If the model is invalid, the operation is cancelled and an error operation  is triggered.
*/

var Vehicle2 = Backbone.Model.extend({
      validate : function (attrs){
          console.log("triggering validate method");
          var validColors =['white','red','blue','yellow'];
          var colorIsValid = function(attrs){
             if(!attrs.color) return true; //no color is valid value
             return _(validColors).include(attrs.color);
          }

          if(!colorIsValid(attrs)){
               return "color must be one of : " + validColors.join(",");
          }
      }
});

var car1 = new Vehicle2();

// You'll have to register an error event.

car1.on('invalid', function(model, error){
    console.log("triggering error....");
    console.log(error);
});

car1.set('foo','bar');
car1.set('color','black', {validate : true});

console.log(car1.get('color'));

// toJSON

/*
  converts Model into Javascript object and NOT JSON string.
  It returns an object containing copies of the model's atrributes

  This object can then be passed to JSON.stringify to get the actual JSON object.

*/

console.log(JSON.stringify(car1.toJSON()));

/*save, fetch and destroy to synchronize with server

save performs insert or update depending upon the state of object.
destry deletes the model from the server
fetch updates the model with server side state.

*/
