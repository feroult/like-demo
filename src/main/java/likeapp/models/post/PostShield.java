package likeapp.models.post;

import io.yawp.repository.shields.Shield;

public class PostShield extends Shield<Post> {

    @Override
    public void defaults() {
        // TODO Auto-generated method stub
        allow();
    }

}
