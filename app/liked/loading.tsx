import Client from 'client';
import Container from "@/components/Container";
import { BounceLoader } from "react-spinners";

const LoadingPage = () => {
  return (
    <Container className="h-full flex items-center justify-center">
      <BounceLoader color="#22c55e" size={40} />
    </Container>
  );
};

export default LoadingPage;
