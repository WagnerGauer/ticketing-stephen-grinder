import axios from "axios";

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);

  return <h1>Landing pagsfe</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server!

    const { data } = await axios.get(
      "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser",
      {
        headers: req.headers,
      }
    );

    console.log(data);
    return data;
  } else {
    // we are in the browser!
    const { data } = await axios
      .get("/api/users/currentuser")
      .catch((err) => console.log(err));
    return data;
  }
};

export default LandingPage;
