import React, { useEffect, useMemo, useState } from "react";
import { Item, DropWrapper, Col } from "../../components/dnd";
import { useSelector, useDispatch } from "react-redux";
import { data as datas, statuses } from "../../data";
// import { fetchGetAllTask, datas } from "../../store/task";
import "./Home.scss";
import { useGetAllTasksQuery } from "../../api";

export const Home = () => {
  const { data, error, isLoading } = useGetAllTasksQuery();
  
  const [items, setItems] = useState([]);

  useMemo(() => {
    if (!isLoading) {
      setItems(data.tasks);
    }
  }, [isLoading, data]);

  function removeDuplicateObjectsById(arr) {
    const uniqueObjects = [];
    const seenIds = {};

    for (const obj of arr) {
      const id = obj.id;
      if (!seenIds[id]) {
        seenIds[id] = true;
        uniqueObjects.push(obj);
      }
    }
    return uniqueObjects;
  }

  const onDrop = (item, monitor, status) => {
    const mapping = statuses.find((si) => si.status === status);

    setItems((prevState) => {
      
      const newItems = prevState
        // .filter((i) => i.id !== item.id)
        // newItems.splice(item.id, 0, { ...item, status, icon: mapping.icon });
        .filter((i) => i.id !== item.id)
        .concat({ ...item, status, icon: mapping.icon });
      
      const uniqueArray = removeDuplicateObjectsById(newItems);
      // console.log("uniqueArray", newItems);
      return [...uniqueArray];

      // return [...newItems];
    });
  };

  const moveItem = (dragIndex, hoverIndex) => {
    const item = items[dragIndex];

    setItems((prevState) => {
      const newItems = prevState.filter((i, idx) => idx !== dragIndex);
      newItems.splice(hoverIndex, 0, item);
      console.log("move", newItems);
      return [...newItems];
    });
  };

  return (
    <div className={"row"}>
      {statuses.map((s) => {
        return (
          <div key={s.status} className={"col-wrapper"}>
            <h2 className={"col-header"}>{s.status.toUpperCase()}</h2>
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Col>
                  {items
                    .filter((i) => {
                      return i.status === s.status;
                    })
                    .map((k, idx) => {
                      return (
                        <Item
                          key={k.id}
                          item={k}
                          index={idx}
                          moveItem={moveItem}
                          status={s}
                        />
                      );
                    })}
                </Col>
              </DropWrapper>
            )}
          </div>
        );
      })}
    </div>
  );
};
