import { useRouter } from "next/router";

const About = () => {
  const router = useRouter();
  const { name } = router.query;

  return (
    <>
      <h1>About Page </h1>
      <h2>Query = {name}</h2>
    </>
  );
};

export default About;