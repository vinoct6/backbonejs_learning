console.log("hello world!");

console.log(Backbone) //Display the object

var book = new Backbone.Model({title:'White Tiger',author:'Arvind Adiga'});

console.log(book);

//Backbone model's don't store the properties of the object directly
//which is why you have to use the get method if you have to get the attribute
//and use the set method if you want to write a property.
console.log("Book's title = " + book.get('title'));

book.set('title','The Trial');

console.log(book.toJSON());
