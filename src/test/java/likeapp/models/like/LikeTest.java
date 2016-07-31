package likeapp.models.like;

import static org.junit.Assert.assertNotNull;

import org.junit.Test;

import likeapp.utils.EndpointTestCase;

public class LikeTest extends EndpointTestCase {

    @Test
    public void testCreate() {
        // TODO Auto-generated method stub
        String json = post("/likes", "{}");
        Like like = from(json, Like.class);

        assertNotNull(like);
    }

}
