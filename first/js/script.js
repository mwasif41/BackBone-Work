$('#root').html("This is the test program !");

/**
 * The model of the todo contains some defaults values
 * and a done attribute
 */
var Todo = Backbone.Model.extend({
    defaults:{
        title: "none",
        done : false
    },
    toggle: function(){
        this.save({done: !this.get(done)});
    }
}); 

/**
 * A collection to hold all the todo objects
 */
var TodoList = Backbone.Collection.extend({
    model: Todo,
});
// todo initializations
var todo1 = new Todo({
    title : "This is backbone.js",
    done:true
});

var todo2 = new Todo({
    title : "doing the testing",
    done:true
});

var todo3 = new Todo({
    title : "performing op",
    done:true
});
// collection creation and adding todo's in it
var todoList = new TodoList;
todoList.add(todo1);
todoList.add(todo2);
todoList.add(todo3);

/**
 * Applying the each method od underscore to on our collection to iterate
 * over all the collections present
//  */
// todoList.each(function(todolist){
//     $("#list").append(
//         '<li>' + 
//         todolist.get('title') + 
//         '</li>'
//     );
// });

/**
 * We create view the first view is the main containor of all the views and then we have 
 * small views to be held in that main view
 */

 /**
  *  1)   The el, or the DOM element. Views must have a DOM element at all times.
  *     In the master view case, we’ll use #list.
  *  2)  The initialize function, which immediately runs when a new 
  *     instance of the view is created.
  *  3) The render function, which renders the view template from model data.
  */
 var TodoListView = Backbone.View.extend({
    el : '#list',
    
    initialize: function(){
        this.render();
    }, 

    render :  function(){
        this.$el.html('');
        todoList.each(function(model){
            var todoview = new TodoView({
                model : model
            });
            this.$el.append(todoview.render().el);
        }.bind(this));
        //return this;
    }
 });

 /**
  * But we need to make a single view that is for rendering inside the main view i.e TodoListView
  */
var TodoView = Backbone.View.extend({
    tagName: 'li',
   
    template: _.template($('#listTemplate').html()),

    render: function(){
        this.$el.html(this.template(this.model.attributes));
        return this; // this is done for chaining method !
    }

});  

// to get the app running that is the view 
var app = new TodoListView();

// displaying on the browser using jquery
// $('#title1').html(todo1.get('title'));

// $('#title2').html(todo2.get('title'));

// $('#title3').html(todo3.get('title'));
