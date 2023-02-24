import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { deletePost, getPosts, savePost, updatePost } from "./redux/PostSlice";



const initialState = {
  title: "",
  description: "",
  imgUrl: "",
};



function App() {

  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.postStore);

  const refInput = useRef();


  const [formulario, setFormulario] = useState(initialState);


  const [isEdit, setEdit] = useState(false);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const HandleChange = (e) => {
    setFormulario({ ...formulario, [e.target.name]: e.target.value });
  };



  const actions = (e) => {
    e.preventDefault();
    isEdit ? dispatch(updatePost(formulario)) : dispatch(savePost(formulario));



    refInput.current.focus();

    cleanState();
  };

  const cleanState = () => {
    setFormulario(initialState);
    setEdit(false);
  };


  const clickUpdate = (post) => {
    setFormulario(post);
    setEdit(true);
  };


  return (
    <div className="container mt-5">
      <Row>
        <Col xs={12} md={4}>
          <Card>
            <Card.Body>
              <Form onSubmit={actions}>
                <Form.Group className="mb-4">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter title"
                    autoFocus
                    name="title"
                    value={formulario.title}
                    ref={refInput}
                    onChange={(e) => HandleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Description"
                    name="description"
                    value={formulario.description} 
                    onChange={(e) => HandleChange(e)}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>imgUrl</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter imgUrl"
                    name="imgUrl"
                    value={formulario.imgUrl}
                    ref={refInput}
                    onChange={(e) => HandleChange(e)}
                  />
                </Form.Group>

                <Button type="submit" variant={isEdit ? "warning" : "primary"}>
                  {isEdit ? "Update" : "Save"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={8}>
          <Row>
            {posts.map((post) => (
              <Col xs={12} md={6} key={post._id}>
                <Card>
                  <Card.Img variant="top" src={post.imgUrl} />

                  <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>

                    <div className="d-flex justify-content-between">
                      <Button
                        variant="danger"
                        onClick={() => dispatch(deletePost(post._id))}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        onClick={() => clickUpdate(post)}
                      >
                        Update
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default App;
