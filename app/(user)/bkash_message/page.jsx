

import BkashMessagePage from '@/app/components/BkashMessagePage';
import { Suspense } from 'react';

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <BkashMessagePage />
    </Suspense>
  );
}