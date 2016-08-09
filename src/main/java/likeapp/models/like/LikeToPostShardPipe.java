package likeapp.models.like;

import io.yawp.repository.pipes.Pipe;
import likeapp.models.post.PostShard;

public class LikeToPostShardPipe extends Pipe<Like, PostShard> {

    @Override
    public String getJoinQueue() {
        return "like-to-shard-join";
    }

    @Override
    public void configureSinks(Like like) {
        addSinkId(id(PostShard.class, shardName(like)));
    }

    private String shardName(Like like) {
        long shard = like.id.asLong() % 50;
        return like.postId.asString() + "-" + shard;
    }

    @Override
    public void flux(Like like, PostShard shard) {
        shard.like();
    }

    @Override
    public void reflux(Like like, PostShard shard) {
        shard.unlike();
    }

}
