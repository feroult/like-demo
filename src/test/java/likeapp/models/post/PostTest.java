package likeapp.models.post;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

import likeapp.utils.EndpointTestCase;

public class PostTest extends EndpointTestCase {

    @Test
    public void testCreate() {
        // TODO Auto-generated method stub
        String json = post("/posts", "{}");
        Post post = from(json, Post.class);

        assertNotNull(post);
    }

}
