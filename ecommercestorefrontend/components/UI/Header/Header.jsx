"use client";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "./header.css";
import { BsCart } from "react-icons/bs";
import { useEffect, useState } from "react";
import { Button, NavDropdown, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../../src/reducers/userReducer";
import { useRouter } from "next/navigation";
import NavCate from "./NavCate";
import { fetchCategories } from "../../../src/reducers/categoryReducer";
import withAuth from "../../withAuth";
import Swal from "sweetalert2";

const Header = () => {
  const [color, setColor] = useState(false);

  const [show, setShow] = useState(false);

  const { push } = useRouter();
  const dispatch = useDispatch();
// Dev Pulse Studio
  const { categories } = useSelector((state) => state.categories);
  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const { user } = useSelector((state) => state.user);
  console.log(user, "user");

  const changeTextColor = () => {
    console.log("test");
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", changeTextColor);
  }, []);

  // logout
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure you want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log out",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(signOut());
        push("/signIn");
      }
    });
  };

  console.log("catego", categories);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Navbar
        sticky="top"
        collapseOnSelect
        expand="lg"
        className=""
        id={color ? "header-bg" : "header"}
      >
        <Container>
          <Navbar.Brand href="/#">
            <div className="flex items-center text-[1vmax] mr-3 ">
              <p
                id={color ? "header-text" : "header"}
                className="text-[2vmax] pl-2 sm:text-[2vmax] md:text-[3vmax] lg:text-[1.7vmax]  text-[#33080A] m-0"
              >
                Ecommerce Store
              </p>
            </div>
          </Navbar.Brand>
          <Navbar.Toggle
            className="bg-white"
            aria-controls="responsive-navbar-nav"
          />
{/* // Dev Pulse Studio */}

          <Navbar.Collapse className="text-center " id="responsive-navbar-nav">
            <Nav className="me-auto ">
              {categories?.map((cate) => {
                return <NavCate category={cate} />;
              })}
            </Nav>
            <Nav className="items-center">
              {user && (
                <NavDropdown
                  className={color ? "header-text" : "header"}
                  id={color ? "header-text" : "header"}
                  title={user.firstName}
                  menuVariant="dark"
                >
                  <Nav.Link
                    className=" text-white ml-3"
                    id={color ? "header-text" : "header"}
                    onClick={handleLogout}
                  >
                    Log Out
                  </Nav.Link>
                  <Nav.Link
                    className=" text-white ml-3"
                    id={color ? "header-text" : "header"}
                    href="/myOrder"
                  >
                    My Orders
                  </Nav.Link>
                </NavDropdown>
              )}

              {!user && (
                <Nav.Link
                  className={color ? "header-text" : "header"}
                  id={color ? "header-text" : "header"}
                  href="/signIn"
                >
                  LogIn
                </Nav.Link>
              )}

              {user.role == "admin" && (
                <>
                  <Nav.Link
                    className={color ? "header-text" : "header"}
                    id={color ? "header-text" : "header"}
                    onClick={handleShow}
                  >
                    Dashboard
                  </Nav.Link>

                  <Offcanvas show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton></Offcanvas.Header>
                    <Offcanvas.Body>
                      <Button
                        className="w-full"
                        variant="light"
                        size="lg"
                        onClick={() => {
                          handleClose();
                          push("/addCategory");
                        }}
                      >
                        Add Category{" "}
                      </Button>
                      <Button
                        className="w-full mt-3"
                        variant="light"
                        size="lg"
                        onClick={() => {
                          handleClose();
                          push("/addProduct");
                        }}
                      >
                        Add Products
                      </Button>{" "}

                      <Button
                        className="w-full mt-3"
                        variant="light"
                        size="lg"
                        onClick={() => {
                          handleClose();
                          push("/orders");
                        }}
                      >
                        Orders
                      </Button>
                    </Offcanvas.Body>
                  </Offcanvas>
                </>
              )}

              <Nav.Link
                className=" text-black mr-3"
                id={color ? "header-text" : "header"}
                href="/cart"
              >
                <BsCart />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default withAuth(Header);