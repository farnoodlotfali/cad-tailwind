import LoadingSpinner from "@/Components/LoadingSpinner";
import { enToFaNumber, numberWithCommas } from "@/Utility/utils";
import { simpleAxiosApi } from "@/api/axiosApi";
import { useCallback, useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Test = () => {
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState(-1);
  const [state, setState] = useState({
    items: [],
    hasMore: true,
    page: 1,
  });

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const res = await simpleAxiosApi({
        url: `/vehicle/type?page=${state.page}`,
      });

      setState((prev) => ({
        hasMore: res.data.Data.last_page > prev.page,
        items: prev.items.concat(res.data.Data.data),
        page: prev.page + 1,
      }));
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state.hasMore && inView) {
      fetchData();
    }
  }, [inView]);

  const handleOnClickCard = (id) => {
    setSelected(id);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
    </div>
  );
};

export default Test;
