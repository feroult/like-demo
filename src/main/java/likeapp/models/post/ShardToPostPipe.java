
package likeapp.models.post;

import io.yawp.repository.pipes.Pipe;

public class ShardToPostPipe extends Pipe<PostShard, Post> {

    @Override
    public String getJoinQueue() {
        return "shard-to-post-join";
    }

    @Override
    public void configureSinks(PostShard shard) {
        addSinkId(id(Post.class, parsePostId(shard)));
    }

    private String parsePostId(PostShard shard) {
        String name = shard.id.asString();
        return name.split("-")[0];
    }

    @Override
    public void flux(PostShard shard, Post post) {
        post.like(shard.likes);
    }

    @Override
    public void reflux(PostShard shard, Post post) {
        post.unlike(shard.likes);
    }

    @Override
    public void configureSources(Post post) {
        for (int i = 0; i < 50; i++) {
            addSourceId(id(PostShard.class, post.id.asString() + "-" + i));
        }
    }

    @Override
    public void drain(Post post) {
        post.drain();
    }
}
