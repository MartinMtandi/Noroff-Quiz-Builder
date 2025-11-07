import React, { useState } from "react";
import Card from "@/components/ui/Card";
import { Badge } from "@/components/ui";
import QuizBuilder from "@/components/QuizBuilder";
import { Accordion, Typography } from "@/components/ui";
import { useQuiz } from "@/hooks/useQuiz";
import EditQuestionForm from "@/components/EditQuestionForm";

const Index: React.FC = () => {
  const { questions } = useQuiz();
  const [lastSavedId, setLastSavedId] = useState<string | null>(null);

  const items = questions.map((q, idx) => {
    const isValid = q.title.trim() !== '' && (
      q.type === 'short' || (q.options.every(o => o.text.trim() !== '') && q.options.some(o => o.correct))
    );

    const isSaved = lastSavedId === q.id;
    const badgeState = isSaved ? 'badge' : isValid ? 'valid' : 'invalid';
    const badgeText = isSaved ? 'Success' : isValid ? 'Valid' : 'Invalid';

    const header = (
      <div className="flex items-center gap-2">
        <Typography as="p" color="text-blue-600" weight={500}>{idx + 1}</Typography>
        <Badge state={badgeState as any} text={badgeText} />
        <span className="truncate">{q.title}</span>
      </div>
    );

    return {
      id: q.id,
      header,
      content: <EditQuestionForm question={q} onSaveSuccess={() => setLastSavedId(q.id)} />,
    };
  });

  return (
    <React.Fragment>
      <Card className="mb-6">
        <QuizBuilder />
      </Card>
      {items.length > 0 ? (
        <Accordion items={items} allowMultiple className="mx-6" />
      ) : (
        <Typography as="p" className="text-center pb-6">No questions yet. Add some above!</Typography>
      )}
    </React.Fragment>
  );
};



export default Index;