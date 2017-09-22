// Blog model
var Blog = Backbone.Model.extend({
    defaults:{
        author: '',
        title:'',
        url:''
    }
});

// Back Bone Collections

var Blogs = Backbone.Collection.extend({

});

// var blog1 = new Blog({
//     author: 'wasif',
//     title:'wasif\'s blog',
//     url : 'www.google.com'
// });

// var blog2 = new Blog({
//     author: 'jhon',
//     title:'jhon\'s blog',
//     url : 'www.google.com'
// });

var blogs = new Blogs();

var BlogView = Backbone.View.extend({
    model : new Blog(),
    tagName: 'tr',
    initialize: function(){
        this.template = _.template($('.blogs-list-template').html());
    },
    events:{
      'click .edit-blog': 'edit',
      'click .update-blog': 'update',
      'click .cancel': 'cancel',
      'click .delete-blog' : 'delete' 
    },
    edit:function(){
        this.$('.edit-blog').hide();
        this.$('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel').show();

        var author = $('.author').html();
        var title = $('.title').html();
        var url = $('.url').html();
        this.$('.author').html('<input type="text" class="form-control author-update" value='+ author +  '>')
        this.$('.title').html('<input type="text" class="form-control title-update" value='+ title +  '>')
        this.$('.url').html('<input type="text" class="form-control url-update" value='+ url +  '>')
        
    },
    update:function(){
        this.model.set('author', $('.author-update').val());
		this.model.set('title', $('.title-update').val());
		this.model.set('url', $('.url-update').val());
    },
    cancel: function(){
        blogsView.render();
    },
    delete: function(){
        this.model.destroy();
    },
    render: function(){
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function(){
        var self = this;
        this.model.on('add',this.render,this);
        this.model.on('change',function(){
            setTimeout(()=>{
                self.render();
            },30);
        },this);
        this.model.on('remove',this.render,this);
    },
    render: function(){
      var self = this;
      this.$el.html('');
      _.each(this.model.toArray(),function(blog){
        self.$el.append((new BlogView({model:blog})).render().$el);
      });  
      return this;
    }
});

var blogsView = new BlogsView();

$(document).ready(function(){
    $('.add-blog').on('click',function(){
        var blog = new Blog({
            author : $('.author-input').val(),
            title : $('.title-input').val(),
            url : $('.url-input').val(),
        });
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');
        
        console.log(blog.toJSON());
        blogs.add(blog);
    })
})