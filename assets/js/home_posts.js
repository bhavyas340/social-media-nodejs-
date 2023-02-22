{
    //method to submit the from data for new post using AJAX  
    let createPost = function(){
        let newPostForm = $('#new-post-form');

        newPostForm.submit(function(e){
            e.preventDefault();  // if will not user able create post if it only use

            $.ajax({
                type:'post',
                url:'/posts/create',
                data:newPostForm.serialize(),
                success: function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    deletePost($(' .delete-post-button', newPost));


                    // call the create comment class
                    new PostComments(data.data.post._id);

                    // CHANGE :: enable the functionality of the toggle like button on the new post
                    new ToggleLike($(' .toggle-like-button', newPost));

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();


                },error: function(error){
                    console.log(error.responseText);
                }


            });
        });
    }

//methos to create post in DOM

let newPostDom = function(post){
    return $(`<li id="post-${post._id}">
                <p>
                    <!--user.id gets the string of user._id and user._id is of type ObjectId -->
                        <small>
                            <a class="delete-post-button" href="/posts/destroy/${post._id}">DELETE</a>
                        </small>
                        ${ post.content}
                                <small>
                                ${post.user.name}
                                </small>

                </p>
                <div class="post-comments">
                    
                        <form action="/comments/create" method="POST">
                            <input type="text" name="content" placeholder="type here to add comment..." required>
                            <input type="hidden" name="post" value="${post._id}">
                            <input type="Submit" value="Add comment">
                        </form>

                    

                            <div class="post-comments-list">
                                <ul id="post-comments-${post._id}">
                                    
                                </ul>
                            </div>
                </div>

            </li>`)
}


//method to delete from DOM

let deletePost = function(deleteLink){ //deleteLink means here i pass the "<a>" tag
    $(deleteLink).click(function(e){
        e.preventDefault();
        $.ajax({
            type: 'get',
            url: $(deleteLink).prop('href'),
            success: function(data){
                $(`#post-${data.data.post_id}`).remove();
            },
            error: function(error){
                console.log(error.responseText);
            }

        })
    })
}


    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
        });
    }



    createPost();
    convertPostsToAjax();

}