(function () {
      var Rectangle = Backbone.Model.extend({});

      var RectangleView = Backbone.View.extend({
            tagName : 'div',
            className : 'rectangle',

            events : {
                'click' : 'move'
            },

            render : function () {
                  this.setDimensions();
                  this.setPosition();
                  this.setColor();
                  return this; //return the view object ?
            },

            setDimensions : function(){
               this.$el.css({
                 width : this.model.get('width') +"px",
                 height : this.model.get('height') + "px"
               });
            },

            setPosition : function(){
               var position = this.model.get('position');
               this.$el.css({
                  left : position.x,
                  top : position.y
               })
            },

            setColor : function() {
                 var color = this.model.get('color');
                 this.$el.css ('background-color', color);
            },

            move : function() {
               this.$el.css ('left' , this.$el.position().left + 10);
            }

      });

      var myRectangle = new Rectangle( {
          width : 100,
          height : 60,
          position : {
             x: 300,
             y: 150
          },
          color : 'red'
      });

      var myView = new RectangleView({model : myRectangle});
      $("#canvas").append(myView.render().el);

})();
