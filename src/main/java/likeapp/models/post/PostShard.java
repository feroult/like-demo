package likeapp.models.post;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;

@Endpoint(path = "/posts-shards")
public class PostShard {

    @Id
    IdRef<PostShard> id;

    long likes;

    public void like() {
        likes++;
    }

    public void unlike() {
        likes--;
    }

}
