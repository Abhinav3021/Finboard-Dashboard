// src/lib/hooks/useFinancialData.ts
import { useState, useEffect } from 'react';
import { fetchFinancialData } from '@/lib/api/financialApi';

interface FinancialDataHook {
  data: any;
  isLoading: boolean;
  error: string | null;
}

export const useFinancialData = (apiUrl: string, interval: number): FinancialDataHook => {
  const [data, setData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFinancialData(apiUrl);
        setData(result);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data, API limit reached');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData(); // Fetch immediately on component mount

    const dataInterval = setInterval(fetchData, interval * 1000); // Fetch at the specified interval

    // Cleanup function to clear the interval
    return () => clearInterval(dataInterval);
  }, [apiUrl, interval]);

  return { data, isLoading, error };
};