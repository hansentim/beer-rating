import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResultCard } from '@/components/result-card';
import { ResultTabsProps } from '@/types';

export const ResultTabs: React.FC<ResultTabsProps> = ({ results }) => {
  return (
    <Tabs defaultValue='total' className='w-full'>
      <TabsList className='flex justify-center mb-4'>
        <TabsTrigger value='total'>Total</TabsTrigger>
        <TabsTrigger value='taste'>Taste</TabsTrigger>
        <TabsTrigger value='christmas'>Christmas</TabsTrigger>
      </TabsList>

      <TabsContent value='total'>
        {results.map((result, index) => (
          <ResultCard
            key={result.beerId}
            rank={index + 1}
            beerId={result.beerId}
            score={result.totalScore}
            userScore={result.userTotal}
          />
        ))}
      </TabsContent>

      <TabsContent value='taste'>
        {results.map((result, index) => (
          <ResultCard
            key={result.beerId}
            rank={index + 1}
            beerId={result.beerId}
            score={result.tasteScore}
            userScore={result.userTaste}
          />
        ))}
      </TabsContent>

      <TabsContent value='christmas'>
        {results.map((result, index) => (
          <ResultCard
            key={result.beerId}
            rank={index + 1}
            beerId={result.beerId}
            score={result.christmasScore}
            userScore={result.userChristmas}
          />
        ))}
      </TabsContent>
    </Tabs>
  );
};
