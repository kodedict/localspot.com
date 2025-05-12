'use client';

import React, { ReactNode } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/lib/utils/queryClient';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { DataProvider } from '@/lib/context/DataContext';
import { Listing, Location, Category, Tag, SeoMetric } from '@/shared/schema';

export interface ProvidersProps {
  children: ReactNode;
  initialLocations?: Location[];
  initialCategories?: Category[];
  initialListings?: (Listing & { tags?: Tag[] })[];
  initialSeoMetrics?: SeoMetric[];
  isServerSide?: boolean;
}

export default function Providers({
  children,
  initialLocations = [],
  initialCategories = [],
  initialListings = [],
  initialSeoMetrics = [],
  isServerSide = false,
}: ProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <DataProvider
          initialLocations={initialLocations}
          initialCategories={initialCategories}
          initialListings={initialListings}
          initialSeoMetrics={initialSeoMetrics}
          isServerSide={isServerSide}
        >
          <Toaster />
          {children}
        </DataProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}