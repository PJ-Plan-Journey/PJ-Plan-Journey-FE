// src/App.jsx
import React from 'react';
import GlobalStyle from '@styles/common/GlobalStyles';
import Router from '@routers/Router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// QueryClient 생성
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // 쿼리가 실패했을 때 재시도 횟수 설정
    },
  },
});

function App() {
  return (
    // QueryClientProvider로 애플리케이션을 감싸기
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <Router />
    </QueryClientProvider>
  );
}

export default App;
