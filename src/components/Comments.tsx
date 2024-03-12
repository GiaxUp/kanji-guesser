import { useState, useEffect } from "react";
import { Form, Button, ListGroup } from "react-bootstrap";
import { Comment } from "../interfaces/types";
import axios from "axios";

const Comments = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_DB}/comments`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const handleCommentSubmit = () => {
    if (newComment.trim() !== "") {
      const newCommentObj: Comment = {
        id: Date.now(),
        text: newComment,
      };

      axios
        .post(`${import.meta.env.VITE_DB}/comments`, newCommentObj, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          setComments([...comments, response.data]);
          setNewComment("");
        })
        .catch((error) => console.error("Error posting comment:", error));
    }
  };

  return (
    <div>
      <h2>Comments</h2>
      <ListGroup>
        {comments.map((comment) => (
          <ListGroup.Item key={comment.id} className="my-1">
            {comment.text}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Form className="mt-4">
        <Form.Group controlId="commentForm">
          <Form.Label>
            Tell me what you think about this web app! Feel free to leave positive or negative
            feedback, I'm always available to hear it! If you also want to suggest new features that
            you wish to see implemented, post a comment!
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
        </Form.Group>
        <Button variant="success" onClick={handleCommentSubmit} className="my-4">
          Post Comment
        </Button>
      </Form>
    </div>
  );
};

export default Comments;
