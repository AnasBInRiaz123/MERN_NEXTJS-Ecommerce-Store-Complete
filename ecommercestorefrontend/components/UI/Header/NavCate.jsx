import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Nav } from "react-bootstrap";

const NavCate = ({ category }) => {
  const { name, _id } = category;

  const { push } = useRouter();

  const [color, setColor] = useState(false);

  const changeTextColor = () => {
    if (window.scrollY >= 90) {
      setColor(true);
    } else {
      setColor(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", changeTextColor);
    return () => {
      window.removeEventListener("scroll", changeTextColor);
    };
  }, []);

  const handleClick = () => {
    push(`/products?category=${_id}`);
  };

  return (
    <Nav.Link
      className="mx-2"
      id={color ? "header-text" : "header"}
      onClick={handleClick}
    >
      {name}
    </Nav.Link>
  );
};

export default NavCate;