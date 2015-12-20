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
console.log(ford.cid);
console.log(ford.isNew()); // true - it hasn't been saved to server.
