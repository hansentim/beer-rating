import React, { useState, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ResultCard } from '@/components/result-card';
import { ResultTabsProps } from '@/types';

export const ResultTabs: React.FC<ResultTabsProps> = ({ results }) => {
  const [activeTab, setActiveTab] = useState<'total' | 'taste' | 'christmas'>(
    'total'
  );

  const sortedResults = useMemo(() => {
    if (activeTab === 'taste') {
      return [...results].sort((a, b) => b.tasteScore - a.tasteScore);
    } else if (activeTab === 'christmas') {
      return [...results].sort((a, b) => b.christmasScore - a.christmasScore);
    }

    return [...results].sort((a, b) => b.totalScore - a.totalScore);
  }, [results, activeTab]);

  return (
    <Tabs
      defaultValue='total'
      className='w-full'
      onValueChange={(value) =>
        setActiveTab(value as 'total' | 'taste' | 'christmas')
      }
    >
      <TabsList className='flex justify-center mb-4'>
        <TabsTrigger
          className='data-[state=on]:bg-customGreen text-white'
          value='total'
        ></TabsTrigger>
        <TabsTrigger value='taste'>Taste</TabsTrigger>
        <TabsTrigger value='christmas'>Christmas</TabsTrigger>
      </TabsList>

      <TabsContent value='total'>
        {sortedResults.map((result, index) => (
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
        {sortedResults.map((result, index) => (
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
        {sortedResults.map((result, index) => (
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
