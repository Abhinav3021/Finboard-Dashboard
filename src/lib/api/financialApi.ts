// src/lib/api/financialApi.ts

export const fetchFinancialData = async (apiUrl: string) => {
  try {
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Check if the API returned an error message in the JSON payload
    if (data && data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error: any) {
    console.error("Failed to fetch financial data:", error);
    throw error;
  }
};