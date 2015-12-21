console.log('views tutorial...')

/*For most applications views will form the majority of the backbone code

Views provide a glue between Models and document. Views often handle model change and DOM events.
Views depend on models, models trigger events that views can handle.

New view types by extending Backbone.View
All views have an associated DOM elements with .el property. The element is either
passed by the view's constructor or is created by the view.

Some views create new DOM elements using tagName, id, className and attributes

*/

var V = Backbone.View.extend({
    tagName : 'li',
    id : 'thing',
    className : 'active',
    attributes : {
      'data-value' : 12345
    }
});

var v = new V();
$('body').prepend(v.el);

//Apply blue background to already existing id in document  'test'
var K = Backbone.View.extend({});
var k = new K({el: "#test"});

k.$el.css ('background-color','blue');

/*Views like models are created by calling the constructor function with the new operator.
To create a view with no special behaviour , we can simply instantiate Backbone.View.

Often you will create a model to the view constructor. Model contains the data,
that is used to render the view

model, collection, el, id, className, tagName and attributes can be passed to the
constructor of the view.
*/

var myModel = new Backbone.Model();
myModel.set('content', 'this is some content');
myModel.set('another-content','another content this is');

var myView = new Backbone.View({
    model : myModel,
    className : 'model-object'

});

//console.log(myView.el);

$('#canvas').append(myView.el);


/*el is an important property that refers to view's DOM element.

$el - $el is the jquery object containing the el property. $el is cached
to avoid repeatedly creating jquery object.
*/

 var v = new Backbone.View({el : 'body'});  //passing any jquery selecter. It grabs the DOM's body
 console.log(v.el);

console.log(v.$el); // what is the difference between this and the previous statement ?. This is the
//Jquery element containing the document's body. So it's not the DOM element directly, but a jquery
//wrapper containing the DOM element.


/*
  this.$ is a Jquery function, scoped to the current view.

  this.$('selector')  = this.$el.find('selector') - Jquery selector don't have to be unique for the
      whole page, but just for that view.
*/

//------render

/*Render is the function that renders the view's element. The default implementation doesn't do anything.
When you implement a view, you should implement the render method. By convention render method returns 'this'.
This pattern makes it easy to chain method calls.

To set a view's model, pass the model to the view's constructor.
Bind the view's render method to an event.

*/

//Let's think about a view that automatically refreshes when the model changes.

var RefreshingView =  Backbone.View.extend({
      initialize : function() {  //Let's bind this view to an event.
         this.model.on('change', function(){
              this.render();
         }, this); //Also passing the view as argument to the on, so that in set's the context.
      },

      render : function() {
         this.$el.html(this.model.get('text'));
      }
});

var m = new Backbone.Model({text : new Date().toString()});
var v1 = new RefreshingView({model: m , el : '#viewtest'});
v1.render();

setInterval (function() {
      m.set({text: new Date().toString()});
}, 1000);

//-- Lightweight technique for generating DOM elements without templates
// you could manually build a string and have jquery build the DOM for you, or you could
//have a structure using Jquery's make method.

/*There are three arguments to the make method
1. The tag
2. The attributes
3. The value

Looks like 'make' is no longer supported.

*/

//var el1 = new Backbone.View().make('h3', {class : 'dummy-class'} , 'Demo Text');

//console.log(el1);


/*remove is a shortcut method to remove the view from the DOM */
//This is equivalent to calling $el.remove();
//Calling remove when it is no longer required, is an important step to prevent memory leaks

var h = new Backbone.Model ({
    content : 'my-new-model'
});

var headerView = Backbone.View.extend({
    tagName : 'p',
    render : function () {
      this.$el.html ( this.model.get('content'));
      return this;
    }
});

var v = new headerView({model: h});

$('body').append(v.render().el);

//v.remove();
