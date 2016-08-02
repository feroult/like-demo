package likeapp.models.post;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;

@Endpoint(path = "/posts")
public class Post {

    @Id
    IdRef<Post> id;

    @Index
    String title;

    long likes;

    public void like() {
        likes++;
    }

    public void unlike() {
        likes--;
    }
}
