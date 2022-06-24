import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { addQuote } from "../api/quoteService";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp from "../hooks/useHttp";
export const NewQuote = () => {
  const history = useHistory();
  const [errorState, setErrorState] = useState()

  const {sendRequest, status, error } = useHttp(addQuote)

  useEffect(() => {
    if(status==='completed' && error ) {
        setErrorState(error)
        return
    }
    if(status==='completed') {
      history.push("/quotes");
    }
  }, [status, history, error])

  const addQouteHandler = (quoteData) => {
    sendRequest(quoteData)
  };

  return <QuoteForm error={errorState} onAddQuote={addQouteHandler} />;
};
