import { GetStaticProps } from "next";

export const getStaticProps: GetStaticProps = async () => {
  return {
    redirect: {
      destination: "/products",
      permanent: false,
    },
  };
};

export default function Home() {
  return null;
}