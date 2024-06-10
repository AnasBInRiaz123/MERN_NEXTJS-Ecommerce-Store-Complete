import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../src/reducers/userReducer";
import { redirect, usePathname } from "next/navigation";

const withAuth = (WrappedComponent) => {
  const Auth = (props) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);
    const userId =
      typeof window != "undefined" && localStorage.getItem("userId");
    useEffect(() => {
      if (userId && !user) {
        dispatch(getUser(userId));
      }
    }, [user, userId]);
    useEffect(() => {
      const path = pathname;
      if (user != "" && !loading && (path == "/signIn" || path == "/signUp")) {
        return redirect("/");
      }
// Dev Pulse Studio
      else if (user.role !== "admin" &&
        !loading && (path == "/addProduct" || path == "/addCategory" || path == "/orders")) {
        return redirect("/");
      }
    }, [loading, pathname, user]);

    if (loading || typeof window === "undefined") {
      return null;
    }

    return <WrappedComponent {...props} />;
  };
  return Auth;
};
// Dev Pulse Studio

export default withAuth;