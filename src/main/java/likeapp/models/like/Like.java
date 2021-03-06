package likeapp.models.like;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import likeapp.models.post.Post;

@Endpoint(path = "/likes")
public class Like {

    @Id
    IdRef<Like> id;

    @Index
    IdRef<Post> postId;

}
