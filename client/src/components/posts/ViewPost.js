import React from "react";
import getFormattedDate from "../../utils/getFormattedDate";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./post.scss";

const ViewPost = ({ post, auth, onDelete, onEdit }) => {
  const postDate = getFormattedDate(post.date);
  return (
    <Container className="mt-4 viewPost">
      <Row className="mt-4">
        <Col className="text-center">
          <Button className="mr-2" variant="outline-info" onClick={onEdit}>
            Edit
          </Button>
          <Button className="mr-2" variant="outline-danger" onClick={onDelete}>
            Delete
          </Button>
          <Link to="/blog">
            <Button variant="outline-info">Dashboard</Button>
          </Link>
        </Col>
      </Row>

      <br />
      <Row>
        <Col className="text-center postTitle">
          <h2>{post.title}</h2>
        </Col>
      </Row>
      <Row className="my-4" style={{ whiteSpace: "pre-wrap" }}>
        <Col>{post.body}</Col>
      </Row>
      <Row className="d-flex flex-column font-italic footerStyle">
        <Col>Date: {postDate}</Col>
      </Row>
    </Container>
  );
};

export default ViewPost;
