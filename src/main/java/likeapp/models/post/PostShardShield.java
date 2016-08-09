package likeapp.models.post;

import io.yawp.repository.shields.Shield;

public class PostShardShield extends Shield<PostShard> {

    @Override
    public void defaults() {
        // TODO Auto-generated method stub
        allow();
    }

}
