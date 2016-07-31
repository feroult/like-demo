package likeapp.models.like;

import io.yawp.repository.shields.Shield;

public class LikeShield extends Shield<Like> {

    @Override
    public void defaults() {
        // TODO Auto-generated method stub
        allow();
    }

}
