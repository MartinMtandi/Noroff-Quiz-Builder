import React from "react";
import Card from "@/components/ui/Card";
import QuizBuilder from "@/components/QuizBuilder";
import { Accordion } from "@/components/ui";
import { useQuiz } from "@/hooks/useQuiz";
import EditQuestionForm from "@/components/EditQuestionForm";

const Index: React.FC = () => {
  const { questions } = useQuiz();

  const items = questions.map((q) => ({
    id: q.id,
    header: q.title,
    content: <EditQuestionForm question={q} />,
  }));

  return (
    <React.Fragment>
      <Card className="mb-6">
        <QuizBuilder />
      </Card>
      {items.length > 0 ? (
        <Accordion items={items} allowMultiple className="mx-6" />
      ) : (
        <p className="text-center text-gray-500">No questions yet. Add some above!</p>
      )}
    </React.Fragment>
  );
};

export default Index;