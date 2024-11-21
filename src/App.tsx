import { useEffect, useState } from "react";
import "./App.css";
import InfiniteScroller from "../libraries/scroller/InfiniteScroller";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [data, setData] = useState<{ uuid: string }[]>([]);

  useEffect(() => {
    setData(
      Array.from({ length: 50 }, () => {
        return { uuid: uuidv4() };
      })
    );
  }, []);
  const topCallback = () => {
    setTimeout(() => {
      setData((prev) => {
        const newData = Array.from({ length: 100 }, () => {
          return { uuid: uuidv4() };
        });
        return [...newData, ...prev];
      });
    }, 0);
  };
  const bottomCallback = () => {
    setTimeout(() => {
      setData((prev) => {
        const newData = Array.from({ length: 100 }, () => {
          return { uuid: uuidv4() };
        });
        return [...prev, ...newData];
      });
    }, 0);
  };

  return (
    <>
      <div id="root-scroller-element">
        <InfiniteScroller
          topCallback={topCallback}
          bottomCallback={bottomCallback}
          hasMoreTop={true}
          hasMoreBottom={true}
          dataLength={data.length}
          scrollableTarget="root-scroller-element"
        >
          {data.map((item) => (
            <div
              style={{
                margin: "8px",
                padding: "8px",
                backgroundColor: "lightgray",
              }}
              key={item.uuid}
            >
              {item.uuid}
            </div>
          ))}
        </InfiniteScroller>
      </div>
    </>
  );
}

export default App;
