import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuizRouter } from "@/components/QuizRouter";

const Index = () => {
  return (
    <div>
      <Header />
      <main>
        <QuizRouter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
