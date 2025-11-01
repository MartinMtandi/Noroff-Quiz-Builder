import { LayoutProps } from '@/types/layout';
import React from 'react';
import QuizHeader from '@/components/QuizHeader';

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <main className={styles.centered}>
        <QuizHeader />
        {children}
      </main>
    </div>
  );
};

const styles = {
  container: "bg-gray-100 min-h-screen flex flex-col items-center",
  centered: "bg-white overflow-hidden rounded-lg outline outline-1 outline-gray-200 w-full max-w-2xl text-center my-20",
};

export default Layout;
