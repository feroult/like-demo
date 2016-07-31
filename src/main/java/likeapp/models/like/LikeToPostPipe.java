package likeapp.models.like;

import io.yawp.repository.pipes.Pipe;
import likeapp.models.post.Post;

public class LikeToPostPipe extends Pipe<Like, Post> {

    @Override
    public void configureSinks(Like like) {
        addSinkId(like.postId);
    }

    @Override
    public void flux(Like like, Post post) {
        post.like();
    }

    @Override
    public void reflux(Like like, Post post) {
        post.unlike();
    }

}
