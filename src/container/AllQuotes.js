import { useEffect } from "react";
import { getAllQuotes } from "../api/quoteService";
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/useHttp";

export const AllQuotes = () => {
  const { sendRequest, status, data, error } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, []);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }
  
  if(error) {
    return <p className="centered focused">{error}</p>
  }

  if(status === 'completed' && (!data || data.length === 0)) {
    return <NoQuotesFound />
  }

  return <QuoteList quotes={data} />;
};
