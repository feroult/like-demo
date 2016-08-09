package likeapp.models.like;

import io.yawp.commons.http.annotation.GET;
import io.yawp.repository.IdRef;
import io.yawp.repository.actions.Action;
import likeapp.models.post.Post;

import java.util.List;

public class LikeCountAction extends Action<Like> {

    @GET
    public int count() {
        String post = requestContext.getParam("post");
        IdRef<Post> postId = id(Post.class, post);

        List<IdRef<Like>> ids = yawp(Like.class).where("postId", "=", postId).ids();
        return ids.size();
    }

}
