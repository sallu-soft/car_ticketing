

import { Suspense } from 'react';
import BkashMessagePage from '../components/BkashMessagePage';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <BkashMessagePage />
    </Suspense>
  );
}